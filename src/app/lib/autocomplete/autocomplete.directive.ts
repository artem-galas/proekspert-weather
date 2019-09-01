import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutocompleteComponent } from './autocomplete.component';

const AUTOCOMPLETE_OPTION_HEIGHT = 48;
const AUTOCOMPLETE_PANEL_HEIGHT = 256;

const getOptionScrollPosition = (optionIndex: number, optionHeight: number,
                                 currentScrollPosition: number, panelHeight: number): number => {
  const optionOffset = optionIndex * optionHeight;

  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
};

@Directive({
  selector: 'input[prwAutocomplete]',
})
export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() prwAutocomplete: AutocompleteComponent;
  private overlayRef: OverlayRef;

  get control() {
    return this.ngControl.control;
  }

  get origin() {
    return this.host.nativeElement;
  }

  private readonly ngUnsubscribe = new Subject<void>();

  constructor(private host: ElementRef<HTMLInputElement>,
              private ngControl: NgControl,
              private vcr: ViewContainerRef,
              private overlay: Overlay) { }

  ngOnInit() {
    fromEvent(this.origin, 'focus')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.openDropdown();

        this.prwAutocomplete.optionsClick()
          .pipe(takeUntil(this.overlayRef.detachments()))
          .subscribe((value: any) => this.setValueAndClose(value));
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openDropdown() {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: AUTOCOMPLETE_PANEL_HEIGHT,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition(),
      hasBackdrop: true
    });

    const template = new TemplatePortal(this.prwAutocomplete.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    this.overlayRef.backdropClick()
      .subscribe(() => this.close());
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;

    if (keyCode === ESCAPE) {
      event.preventDefault();
    }

    if (event.keyCode === ENTER) {
      this.setValueAndClose(this.prwAutocomplete._keyManager.activeItem.value);
    } else if (this.prwAutocomplete) {
      const prevActiveItem = this.prwAutocomplete._keyManager.activeItem;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

      this.prwAutocomplete._keyManager.onKeydown(event);

      if (isArrowKey || this.prwAutocomplete._keyManager.activeItem !== prevActiveItem) {
        this._scrollToOption();
      }
    }
  }

  _scrollToOption(): void {
    const index = this.prwAutocomplete._keyManager.activeItemIndex || 0;
    const newScrollPosition = getOptionScrollPosition(
      index,
      AUTOCOMPLETE_OPTION_HEIGHT,
      this.prwAutocomplete._getScrollTop(),
      AUTOCOMPLETE_PANEL_HEIGHT
    );
    this.prwAutocomplete._setScrollTop(newScrollPosition);
  }

  private close() {
    this.overlayRef.dispose();
  }

  private getOverlayPosition() {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  private setValueAndClose(value: any) {
    const toDisplay = this.prwAutocomplete && this.prwAutocomplete.displayWith ?
      this.prwAutocomplete.displayWith(value) :
      value;
    this.control.setValue(toDisplay);
    this.prwAutocomplete._emitSelectEvent(value);
    this.close();
  }
}

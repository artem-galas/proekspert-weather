import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: '[prwAutocomplete]'
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
      maxHeight: 40 * 3,
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

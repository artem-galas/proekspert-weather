import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AutocompleteComponent } from './autocomplete.component';

export function overlayClickOutside( overlayRef: OverlayRef, origin: HTMLElement ) {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin;
        const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false);

        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    );
}

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
          .subscribe(( value: string ) => {
            this.control.setValue(value);
            this.close();
          });
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
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.prwAutocomplete.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin)
      .subscribe(() => this.close());
  }

  private close() {
    this.overlayRef.detach();
    this.overlayRef = null;
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
}

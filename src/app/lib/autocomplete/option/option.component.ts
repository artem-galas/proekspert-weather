import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

import { fromEvent, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'prw-option',
  template: `<span class="option-text"><ng-content></ng-content></span>`,
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit, Highlightable {
  @Input() value: any;
  click$: Observable<string>;

  get element() {
    return this.host.nativeElement;
  }

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  private _isActive = false;

  constructor(private host: ElementRef) { }

  ngOnInit() {
    this.click$ = fromEvent(this.element, 'click')
      .pipe(mapTo(this.value));
  }

  setActiveStyles() {
    this._isActive = true;
  }

  setInactiveStyles() {
    this._isActive = false;
  }

  getLabel() {
    return this.value.name;
  }

}

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

import { fromEvent, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'prw-option',
  template: `
    <div class="option">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit {
  @Input() value: string;
  click$: Observable<string>;

  get element() {
    return this.host.nativeElement;
  }

  constructor(private host: ElementRef) { }

  ngOnInit() {
    this.click$ = fromEvent(this.element, 'click')
      .pipe(mapTo(this.value));
  }

}

import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';

import { OptionComponent } from '~/lib/autocomplete/option/option.component';
import { AutocompleteContentDirective } from '~/lib/autocomplete/autocomplete-content.directive';


@Component({
  selector: 'prw-autocomplete',
  template: `
    <ng-template #root>
      <div class="autocomplete" #panel>
        <ng-container *ngTemplateOutlet="content.tpl"></ng-container>
      </div>
    </ng-template>
  `,
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'prwAutocomplete'
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @ViewChild('root', {static: true}) rootTemplate: TemplateRef<any>;

  @ViewChild('panel', {static: false}) panel: ElementRef;

  @ContentChild(AutocompleteContentDirective, {static: true})
  content: AutocompleteContentDirective;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  @Output()
  optionSelected = new EventEmitter<any>();

  _keyManager: ActiveDescendantKeyManager<OptionComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._keyManager = new ActiveDescendantKeyManager(this.options)
      .withWrap()
      .withTypeAhead();
  }

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);

        return merge(...clicks$);
      })
    );
  }

  _emitSelectEvent(option: any): void {
    this.optionSelected.emit(option);
  }

  _setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  _getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

}

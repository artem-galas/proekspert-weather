import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { OptionComponent } from '~/lib/autocomplete/option/option.component';
import { AutocompleteContentDirective } from '~/lib/autocomplete/autocomplete-content.directive';

@Component({
  selector: 'prw-autocomplete',
  template: `
    <ng-template #root>
      <div class="autocomplete">
        <ng-container *ngTemplateOutlet="content.tpl"></ng-container>
      </div>
    </ng-template>
  `,
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'prwAutocomplete'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('root', {static: true}) rootTemplate: TemplateRef<any>;

  @ContentChild(AutocompleteContentDirective, {static: true})
  content: AutocompleteContentDirective;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  constructor() { }

  ngOnInit() {
  }

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);

        return merge(...clicks$);
      })
    );
  }

}

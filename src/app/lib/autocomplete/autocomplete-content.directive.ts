import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[prwAutocompleteContent]'
})
export class AutocompleteContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

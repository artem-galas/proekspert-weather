import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutocompleteComponent } from './autocomplete.component';
import { OptionComponent } from './option/option.component';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { AutocompleteDirective } from './autocomplete.directive';

const publicApi = [
  AutocompleteComponent,
  AutocompleteDirective,
  AutocompleteContentDirective,
  OptionComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [publicApi],
  exports: [publicApi],
  entryComponents: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }

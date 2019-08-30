import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '~/lib/autocomplete/autocomplete.module';

import { CityAutocompleteComponent } from './city-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteModule
  ],
  declarations: [
    CityAutocompleteComponent
  ],
  exports: [
    CityAutocompleteComponent
  ]
})
export class CityAutocompleteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityAutocompleteComponent } from './city-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CityAutocompleteComponent
  ],
  exports: [
    CityAutocompleteComponent
  ]
})
export class CityAutocompleteModule { }

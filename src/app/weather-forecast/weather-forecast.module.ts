import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperaturePipeModule, WeatherIconModule } from '~/lib/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    TemperaturePipeModule,
    WeatherIconModule,
    ReactiveFormsModule
  ],
  declarations: [
    WeatherForecastComponent
  ],
  exports: [
    WeatherForecastComponent
  ]
})
export class WeatherForecastModule { }

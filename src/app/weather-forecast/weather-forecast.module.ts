import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperaturePipeModule, WeatherIconModule } from '~/lib/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';

@NgModule({
  imports: [
    CommonModule,
    TemperaturePipeModule,
    WeatherIconModule
  ],
  declarations: [
    WeatherForecastComponent
  ],
  exports: [
    WeatherForecastComponent
  ]
})
export class WeatherForecastModule { }

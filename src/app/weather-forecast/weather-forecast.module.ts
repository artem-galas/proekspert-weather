import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherForecastComponent } from './weather-forecast.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WeatherForecastComponent
  ],
  exports: [
    WeatherForecastComponent
  ]
})
export class WeatherForecastModule { }

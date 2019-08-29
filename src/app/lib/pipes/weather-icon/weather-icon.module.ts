import { NgModule } from '@angular/core';
import { WeatherIconPipe } from './weather-icon.pipe';

@NgModule({
  declarations: [
    WeatherIconPipe
  ],
  exports: [
    WeatherIconPipe
  ]
})
export class WeatherIconModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';

import { WeatherForecastConfigService } from '~/lib/services';

import { WeatherForecastModule } from './weather-forecast';
import { CityAutocompleteModule } from './city-autocomplete';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherForecastModule,
    CityAutocompleteModule,
    OverlayModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: WeatherForecastConfigService,
      useValue: {
        apiToken: 'a0b3ae45f0033ba65a63e3c8177c6962'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

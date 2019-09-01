import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';

import { WeatherForecastConfigService } from '~/lib/services';

import { WeatherForecastModule } from './weather-forecast';
import { CityAutocompleteModule } from './city-autocomplete';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherForecastModule,
    CityAutocompleteModule,
    OverlayModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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

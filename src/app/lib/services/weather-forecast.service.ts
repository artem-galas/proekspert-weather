import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { OpenWeatherDto } from '~/lib/dto';

import { WeatherForecastConfig, WeatherForecastConfigService } from './weather-forecast.config.service';

type ID = number;
type cityName = string;

type GetCurrentWeatherParams = ID | cityName;

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  private readonly apiUrl = '//api.openweathermap.org/data/2.5/weather/';

  constructor(private readonly http: HttpClient,
              @Inject(WeatherForecastConfigService) private readonly config: WeatherForecastConfig) { }

  getCurrentWeather(value: GetCurrentWeatherParams): Observable<OpenWeatherDto> {
    let params = new HttpParams();
    params = params.append('appid', this.config.apiToken);

    if (typeof value === 'string') {
      params = params.append('q', value);
    } else if (typeof value === 'number') {
      params = params.append('id', value.toString());
    } else {
      throw TypeError('Invalid arguments types. It can be string or number');
    }

    return this.http.get<OpenWeatherDto>(`${this.apiUrl}`, {params})
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => throwError(httpErrorResponse.error))
      );
  }
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { OpenWeatherDto, DailyForecastDto, DailyForecastItem } from '~/lib/dto';

import { WeatherForecastConfig, WeatherForecastConfigService } from './weather-forecast.config.service';

type ID = number;
type cityName = string;

type GetCurrentWeatherParams = ID | cityName;

const buildParams = (value: GetCurrentWeatherParams, apiToken: string) => {
  let params = new HttpParams();
  params = params.append('appid', apiToken);
  params = params.append('units', 'metric');

  if (typeof value === 'string') {
    params = params.append('q', value);
  } else if (typeof value === 'number') {
    params = params.append('id', value.toString());
  } else {
    throw TypeError('Invalid arguments types. It can be string or number');
  }

  return params;
};

export class DailyForecast {
  current: DailyForecastItem;
  nextDays: Array<DailyForecastItem>;

  constructor(value: DailyForecastDto['list']) {
    this.nextDays = [];
    value.map(item => {
      if (new Date(item.dt * 1000).getUTCDate() === new Date().getUTCDate()) {
        this.current = item;
      } else {
        this.nextDays.push(item);
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  private readonly apiUrl = '//api.openweathermap.org/data/2.5/';

  constructor(private readonly http: HttpClient,
              @Inject(WeatherForecastConfigService) private readonly config: WeatherForecastConfig) { }

  getCurrentWeather(value: GetCurrentWeatherParams): Observable<OpenWeatherDto> {
    const params = buildParams(value, this.config.apiToken);

    return this.http.get<OpenWeatherDto>(`${this.apiUrl}/weather`, {params})
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => throwError(httpErrorResponse.error))
      );
  }

  getDailyForecast(value: GetCurrentWeatherParams): Observable<DailyForecast> {
    const params = buildParams(value, this.config.apiToken);

    return this.http.get<DailyForecastDto>(`${this.apiUrl}/forecast/daily`, {params})
      .pipe(
        map(response => new DailyForecast(response.list)),
        catchError((httpErrorResponse: HttpErrorResponse) => throwError(httpErrorResponse.error))
      );
  }
}

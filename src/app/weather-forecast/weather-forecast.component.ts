import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DailyForecast, WeatherForecastService } from '~/lib/services';

@Component({
  selector: 'prw-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {
  cityName = 'Tallinn';
  forecast$: Observable<DailyForecast>;
  constructor(private readonly weatherForecastService: WeatherForecastService) { }

  ngOnInit() {
    this.forecast$ = this.weatherForecastService.getDailyForecast(this.cityName);
  }

}

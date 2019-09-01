import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { forkJoin, Observable } from 'rxjs';

import { DailyForecast, WeatherForecastService } from '~/lib/services';
import {OpenWeatherDto} from '~/lib/dto';

@Component({
  selector: 'prw-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {
  @Input()
  city: number | string;

  @Output()
  back = new EventEmitter<void>();

  weather$: Observable<{current: OpenWeatherDto, forecast: DailyForecast}>;
  constructor(private readonly weatherForecastService: WeatherForecastService) { }

  ngOnInit() {
    this.weather$ = forkJoin({
      current: this.weatherForecastService.getCurrentWeather(this.city),
      forecast: this.weatherForecastService.getDailyForecast(this.city)
    });
  }

}

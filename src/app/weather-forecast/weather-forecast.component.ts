import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable } from 'rxjs';

import { DailyForecast, WeatherForecastService } from '~/lib/services';

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

  forecast$: Observable<DailyForecast>;
  constructor(private readonly weatherForecastService: WeatherForecastService) { }

  ngOnInit() {
    this.forecast$ = this.weatherForecastService.getDailyForecast(this.city);
  }

}

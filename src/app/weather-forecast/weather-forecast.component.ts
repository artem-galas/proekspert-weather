import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import { forkJoin, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { DailyForecast, WeatherForecastService } from '~/lib/services';
import { OpenWeatherDto, TemperatureUnits } from '~/lib/dto';

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

  get units() {
    return this.tempUnitControl.value ?
      'imperial' :
      'metric';
  }

  tempUnitControl = new FormControl(false);

  weather$: Observable<{current: OpenWeatherDto, forecast: DailyForecast}>;
  constructor(private readonly weatherForecastService: WeatherForecastService) { }

  ngOnInit() {
    this.loadWeather();
    this.valueChanges();
  }

  loadWeather(units: TemperatureUnits = 'metric') {
    this.weather$ = forkJoin({
      current: this.weatherForecastService.getCurrentWeather(this.city, units),
      forecast: this.weatherForecastService.getDailyForecast(this.city, units)
    });
  }

  private valueChanges() {
    this.tempUnitControl
      .valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe((value) => {
      value ?
        this.loadWeather('imperial') :
        this.loadWeather('metric');
    });
  }

}

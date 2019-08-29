import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '~/lib/services';
import { Observable } from 'rxjs';
import { Forecast, OpenWeatherDto } from '~/lib/dto';

@Component({
  selector: 'prw-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {
  cityName = 'Tallinn';

  currentWeather$: Observable<OpenWeatherDto>;
  forecast$: Observable<Forecast[]>;
  constructor(private readonly weatherForecastService: WeatherForecastService) { }

  ngOnInit() {
    this.currentWeather$ = this.weatherForecastService.getCurrentWeather(this.cityName);
    this.forecast$ = this.weatherForecastService.getWeatherFiveDays(this.cityName);

    this.weatherForecastService.getWeatherFiveDaysT(this.cityName)
    .subscribe(res => console.log(res));
  }

}

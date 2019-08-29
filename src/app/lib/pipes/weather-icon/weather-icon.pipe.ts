import { Pipe, PipeTransform } from '@angular/core';

type WeatherConditions =
  'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Clear'
  | 'Clouds';

@Pipe({
  name: 'weatherIcon',
  pure: true
})
export class WeatherIconPipe implements PipeTransform {

  transform(weatherCondition: WeatherConditions | string): string {
    switch (weatherCondition) {
      case 'Clear':
        return 'wi-day-sunny';
      case 'Thunderstorm':
        return 'wi-thunderstorm';
      case 'Drizzle':
        return 'wi-hail';
      case 'Clouds':
        return 'wi-cloudy';
      case 'Rain':
        return 'wi-rain';
      case 'Snow':
        return 'wi-snow';
      default:
        return 'wi-day-sunny';
    }
  }

}

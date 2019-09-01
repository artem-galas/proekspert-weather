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
        return 'wi wi-day-sunny';
      case 'Thunderstorm':
        return 'wi wi-thunderstorm';
      case 'Drizzle':
        return 'wi wi-hail';
      case 'Clouds':
        return 'wi wi-cloudy';
      case 'Rain':
        return 'wi wi-rain';
      case 'Snow':
        return 'wi wi-snow';
      default:
        return 'wi wi-day-sunny';
    }
  }

}

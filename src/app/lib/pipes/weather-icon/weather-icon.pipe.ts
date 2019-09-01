import { Pipe, PipeTransform } from '@angular/core';

type IconStyles = 'neutral' | 'dependsOnTime';

type WeatherConditions =
  'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Clear'
  | 'Clouds';

const getIcon = (iconClass: string, iconStyle: IconStyles): string => {
  const dependsOnTime = iconStyle === 'dependsOnTime';
  const currentHours = new Date().getUTCHours();
  const isDay = currentHours < 18 && currentHours > 6;
  let icon;

  if (dependsOnTime) {
    const timeClass = isDay ? 'day' : 'night';
    icon = `wi-${timeClass}-${iconClass}`;
  } else {
    icon = `wi-${iconClass}`;
  }

  return `wi ${icon}`;
};

@Pipe({
  name: 'weatherIcon',
  pure: true
})
export class WeatherIconPipe implements PipeTransform {

  transform(weatherCondition: WeatherConditions | string, iconStyle: IconStyles = 'neutral'): string {
    switch (weatherCondition) {
      case 'Clear':
        return 'wi wi-day-sunny';
      case 'Thunderstorm':
        return getIcon('thunderstorm', iconStyle);
      case 'Drizzle':
        return getIcon('hail', iconStyle);
      case 'Clouds':
        return getIcon('cloudy', iconStyle);
      case 'Rain':
        return getIcon('rain', iconStyle);
      case 'Snow':
        return getIcon('snow', iconStyle);
      default:
        return 'wi wi-day-sunny';
    }
  }

}

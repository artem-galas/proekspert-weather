import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnits } from '~/lib/dto';

@Pipe({
  name: 'temperature',
  pure: true
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, unit: TemperatureUnits = 'metric'): string {
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    return `${Math.round(value)}${unitSymbol}`;
  }

}

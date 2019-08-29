import { Pipe, PipeTransform } from '@angular/core';

type unitTypes = 'metric' | 'imperial';

@Pipe({
  name: 'temperature',
  pure: true
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, unit: unitTypes = 'metric'): string {
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    return `${Math.round(value)}${unitSymbol}`;
  }

}

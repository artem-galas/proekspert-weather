import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import {CityListService, WeatherForecastService} from '~/lib/services';
import { CityDto } from '~/lib/dto';

@Component({
  selector: 'prw-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss']
})
export class CityAutocompleteComponent implements OnInit {
  @Output()
  selectedCity = new EventEmitter<CityDto['id']>();

  control = new FormControl();
  cities: Array<CityDto>;
  cityList$: Observable<CityDto[]>;
  constructor(private readonly cityListService: CityListService,
              private readonly weatherService: WeatherForecastService) { }

  ngOnInit() {
    this.cityListService.getCities()
      .subscribe(cities => this.cities = cities);

    this.cityList$ = this.control
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith<string | CityDto>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.searchCity(name) : []),
      );
  }

  displayWithFn(city: CityDto): string | undefined {
    return city ? `${city.name}, ${city.country}` : undefined;
  }

  selectCity(city: CityDto) {
    this.selectedCity.emit(city.id);
    localStorage.setItem('prw-city', city.id.toString());
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.weatherService.getCurrentWeather(position.coords)
          .subscribe(res => {
            const city = {
              coord: {
                ...res.coord
              },
              country: res.sys.country,
              id: res.id,
              name: res.name
            };
            this.selectCity(city);
            this.control.setValue(this.displayWithFn(city), {emitEvent: false});
          });
      },
      error => {
        console.log(error);
      },
    );
  }

  private searchCity(name: string): Array<CityDto> {
    const filterValue = name.toLocaleLowerCase();

    return this.cities
      .filter(city => city.name
        .toLocaleLowerCase()
        .includes(filterValue.toLocaleLowerCase())
      );
  }

}

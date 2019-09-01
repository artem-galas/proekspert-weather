import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import {ReactiveFormsModule} from '@angular/forms';

import { of } from 'rxjs';

import { CityDto } from '~/lib/dto';
import { CityListService, WeatherForecastService } from '~/lib/services';
import { AutocompleteModule } from '~/lib/autocomplete/autocomplete.module';

import { CityAutocompleteComponent } from './city-autocomplete.component';

const mockCityDto: CityDto = {
  id: 1,
  name: 'City',
  country: 'Country',
  coord: {
    lon: 1,
    lat: 1
  }
};

describe('CityAutocompleteComponent', () => {
  let component: CityAutocompleteComponent;
  let fixture: ComponentFixture<CityAutocompleteComponent>;

  beforeEach(async(() => {
    const cityService = jasmine.createSpyObj('CityListService', ['getCities']);
    cityService.getCities.and.returnValue(of([mockCityDto]));
    const weatherService = jasmine.createSpyObj('WeatherForecastService', ['getCurrentWeather']);
    weatherService.getCurrentWeather.and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AutocompleteModule,
        OverlayModule
      ],
      declarations: [ CityAutocompleteComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: CityListService, useValue: cityService
        },
        {
          provide: WeatherForecastService, useValue: weatherService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

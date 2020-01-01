import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';

import { openWeatherResponseMock } from '~/lib/services/weather-forecast.service.spec';

import { DailyForecast, WeatherForecastService } from '~/lib/services';
import {TemperaturePipeModule, WeatherIconModule} from '~/lib/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';

const listItem = {
  dt: 1567410982,
  temp: {
    day: 21,
    eve: 21,
    max: 21,
    min: 13.92,
    morn: 21,
    night: 13.92,
  },
  pressure: 1015.29,
  humidity: 60,
  deg: 165,
  speed: 1.85,
  clouds: 98,
  weather: [{
    description: 'overcast clouds',
    icon: '04d',
    id: 804,
    main: 'Clouds',
  }]
};


const dailyForecastMock: DailyForecast = {
  nextDays: [
    {
      ...listItem,
    },
  ],
  today: {
    ...listItem,
    dt: 1567504800
  }
};

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let weatherForecastSpy;

  beforeEach(async(() => {
    weatherForecastSpy = jasmine.createSpyObj('WeatherForecastService', [
      'getCurrentWeather',
      'getDailyForecast'
    ]);
    weatherForecastSpy.getCurrentWeather
      .and.returnValue(of(openWeatherResponseMock));
    weatherForecastSpy.getDailyForecast
      .and.returnValue(of(dailyForecastMock));

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        WeatherIconModule,
        TemperaturePipeModule
      ],
      declarations: [
        WeatherForecastComponent
      ],
      providers: [
        {
          provide: WeatherForecastService, useValue: weatherForecastSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  describe('Should display', () => {
    it('weather-today', () => {
      const weatherNow = document.querySelector('.weather-today .now');
      const temp = weatherNow.querySelector('span');

      expect(temp.innerText)
        .toBe('19°C');
    });

    it('weather-week', () => {
      const weatherWeek = document.querySelector('.weather-week');
      const days = weatherWeek.querySelectorAll('.day');
      const date = days[0].querySelector('label');

      expect(days.length)
        .toBe(1);
      expect(date.innerText)
        .toBe('Monday');
    });
  });
});

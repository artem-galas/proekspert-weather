import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {of} from 'rxjs';

import { openWeatherResponseMock } from '~/lib/services/weather-forecast.service.spec';
import { DailyForecast, WeatherForecastService } from '~/lib/services';
import {TemperaturePipeModule, WeatherIconModule} from '~/lib/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';
import {ReactiveFormsModule} from "@angular/forms";

const dailyForecastMock = new DailyForecast({
  city: {
    coord: {
      lat: 1,
      lon: 1
    },
    name: 'City',
  },
  list: [{
    dt: 1567332000,
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
  }]
});

describe('WeatherForecastComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let component: WeatherForecastComponent;

  beforeEach(async(() => {
    const weatherForecast = jasmine.createSpyObj('WeatherForecastService', [
      'getCurrentWeather',
      'getDailyForecast'
    ]);
    weatherForecast.getCurrentWeather
      .and.returnValue(of(openWeatherResponseMock));
    weatherForecast.getDailyForecast
      .and.returnValue(of(dailyForecastMock));

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        WeatherIconModule,
        TemperaturePipeModule
      ],
      declarations: [
        TestHostComponent,
        WeatherForecastComponent
      ],
      providers: [
        {
          provide: WeatherForecastService, useValue: weatherForecast
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    component = testHostComponent.testingComponent;
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  @Component({
    selector: 'prw-host-component',
    template: `<prw-weather-forecast></prw-weather-forecast>`
  })
  class TestHostComponent {
    @ViewChild(WeatherForecastComponent, {static: true})
    public testingComponent: WeatherForecastComponent;
  }
});

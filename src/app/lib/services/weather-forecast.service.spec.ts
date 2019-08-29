import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastConfigService } from '~/lib/services/weather-forecast.config.service';
import { OpenWeatherDto } from '~/lib/dto';

export const openWeatherResponseMock: OpenWeatherDto = {
  coord: {
    lon: -0.13,
    lat: 51.51
  },
  weather: [
    {
      id: 300,
      main: 'Drizzle',
      description: 'light intensity drizzle',
      icon: '09d'
    }
  ],
  base: 'stations',
  main: {
    temp: 280.32,
    pressure: 1012,
    humidity: 81,
    temp_min: 279.15,
    temp_max: 281.15
  },
  visibility: 10000,
  wind: {
    speed: 4.1,
    deg: 80
  },
  clouds: {
    all: 90
  },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0103,
    country: 'GB',
    sunrise: 1485762037,
    sunset: 1485794875
  },
  id: 2643743,
  name: 'London',
  cod: 200
};

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherForecastService,
        {
          provide: WeatherForecastConfigService,
          useValue: {
            apiToken: 'apiToken'
          }
        }
      ]
    });

    service = TestBed.get(WeatherForecastService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });


  describe('.getCurrentWeather by cityName', () => {
    let expectedResponse: OpenWeatherDto;
    const mockValue = 'London';

    beforeEach(() => {
      service = TestBed.get(WeatherForecastService);
      expectedResponse = openWeatherResponseMock;
    });

    it('should return openWeatherResponse', () => {
      service.getCurrentWeather(mockValue)
        .subscribe(
          response => expect(response)
            .toEqual(expectedResponse),
          fail
        );

      const req = httpTestingController
        .expectOne(request => request.url.includes('api.openweathermap.org/data/2.5/weather'));

      expect(req.request.params.has('appid'))
        .toBeTruthy();

      expect(req.request.params.has('q'))
        .toBeTruthy();

      req.flush(expectedResponse);
    });

    it('should catch error response', () => {
      const errorResponse = {
        message: 'Server Error'
      };

      service.getCurrentWeather(mockValue)
        .subscribe(
          fail,
          (error) => expect(error)
            .toEqual(errorResponse)
        );

      const req = httpTestingController
        .expectOne(request => request.url.includes('api.openweathermap.org/data/2.5/weather'));

      req.flush({
        message: 'Server Error'
      }, {
        status: 500,
        statusText: 'Unknown Error',
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastConfigService } from '~/lib/services/weather-forecast.config.service';
import { OpenWeatherDto } from '~/lib/dto';

export const openWeatherResponseMock: OpenWeatherDto = {
  coord: {
    lat: 58.38,
    lon: 26.73
  },
  weather: [
    {
      description: 'clear sky',
      icon: '01d',
      id: 800,
      main: 'Clear',
    }
  ],
  base: 'stations',
  main: {
    humidity: 82,
    pressure: 1012,
    temp: 18.74,
    temp_max: 20.56,
    temp_min: 17,
  },
  visibility: 10000,
  wind: {
    speed: 4.1,
    deg: 80
  },
  clouds: {
    all: 90
  },
  dt: 1567410982,
  sys: {
    country: 'EE',
    id: 1335,
    message: 0.0062,
    sunrise: 1567394007,
    sunset: 1567444371,
    type: 1
  },
  id: 1,
  name: 'City',
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

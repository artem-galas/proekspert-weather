export interface OpenWeatherDto {
  id: number;
  name: string;
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: Coord;
  dt: number;
  visibility: number;
  weather: Array<Weather>;
  wind: Wind;
  sys: Sys;
  main: Main;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Wind {
  deg: number;
  speed: number;
}

export interface Sys {
  country: string;
  id: number;
  message: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface Main {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface ForecastDto {
  city: {
    coord: Coord;
    name: string;
  };
  list: Array<Forecast>;
}

export interface Forecast {
  dt: number;
  dt_text: string;
  main: Main;
  weather: Array<Weather>;
  wind: Wind;
}

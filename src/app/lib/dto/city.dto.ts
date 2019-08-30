export interface CityDto {
  id: number;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number
  };
}

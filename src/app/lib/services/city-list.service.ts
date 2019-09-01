import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ungzip } from 'pako';
import { CityDto } from '~/lib/dto';

@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private readonly http: HttpClient) { }

  getCities(): Observable<CityDto[]> {
    return this.http.get('assets/city.list.json.gz', {
      responseType: 'arraybuffer',
    })
      .pipe(
        map((arrayBuffer) => {
          const data = new Uint8Array(arrayBuffer);

          return (
            JSON.parse(
              ungzip(data, {to: 'string'})
            ) as Array<CityDto>
          );
        })
      );
  }
}

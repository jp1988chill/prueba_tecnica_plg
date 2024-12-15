import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';
import {Observable} from 'rxjs';
import {IParametry} from '../../../shared/models/parametry';
import {ParamType} from '../http/http.param';

@Injectable({
  providedIn: 'root'
})
export class ParametryService {

  constructor(private http: HttpService) {
  }

  getParametry(catalog: string): Observable<Array<IParametry>> {
    const params = [
      {type: ParamType.PATH_PARAM, key: '{catalog}', value: catalog},
    ];
    return this.http.doGet<Array<IParametry>>(env => env.endpoints.catalog, params);
  }


}

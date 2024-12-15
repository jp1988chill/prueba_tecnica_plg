import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';
import {IUFRsp} from '../../../shared/models/uf';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UfValueService {

  constructor(private http: HttpService) {
  }

  getUfValue(): Observable<IUFRsp> {
    return this.http.doGet1<IUFRsp>(env => env.endpoints.uf);
  }

}

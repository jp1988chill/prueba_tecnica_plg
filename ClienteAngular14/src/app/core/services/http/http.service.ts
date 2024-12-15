import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {DELETE, EMPTY_PARAMS, GET, POST, PUT} from './http.constants';
import {HttpParam} from './http.param';
import {createQueryString, replacePathParams, toJson} from './http.functions';
import {catchError} from 'rxjs/internal/operators';
import {HttpConfig} from './http.config';
import {HttpCallInfo} from './model/entity';
import {LoggerService} from '../logger/logger.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
              private httpConfig: HttpConfig,
              private logger: LoggerService) {
  }

  doGet1<T>(endpoint): Observable<T> {
    return this.doGet<T>(endpoint, EMPTY_PARAMS);
  }

  doGet2<T>(endpoint, params: HttpParam[]): Observable<T> {
    return this.doGet<T>(endpoint, params);
  }

  doGet<T>(endpoint, pathParams: HttpParam[] = EMPTY_PARAMS, queryParams?: HttpParam[]): Observable<T> {
    return this.invoke<T>(GET, endpoint, pathParams, queryParams);
  }

  doPost<T>(endpoint): Observable<T> {
    return this.doPost2<T>(endpoint, {}, {});
  }

  doPost1<T>(endpoint, body): Observable<T> {
    return this.doPost2<T>(endpoint, body, {});
  }

  doPost2<T>(endpoint, body, options): Observable<T> {
    return this.doPost3<T>(endpoint, EMPTY_PARAMS, body, options);
  }

  doPost3<T>(endpoint, params: HttpParam[], body, options?): Observable<T> {
    return this.invoke<T>(POST, endpoint, params, body, options);
  }

  doPut<T>(endpoint, params: HttpParam[], body, options?): Observable<T> {
    return this.invoke<T>(PUT, endpoint, params, body, options);
  }

  doDelete<T>(endpoint, params: HttpParam[]): Observable<T> {
    return this.invoke<T>(DELETE, endpoint, params);
  }

  private invoke<T>(
    httpMethod: string,
    endpoint,
    params: HttpParam[],
    body?: any,
    options = {headers: null}): Observable<T> {

    const env: any = this.httpConfig.environment;
    const endpointObject = endpoint(env);
    const path = replacePathParams(params, endpointObject.path);
    const queryString = createQueryString(params);
    const url = env.baseUrl + path + queryString;

    let resp: Observable<T>;

    switch (httpMethod) {
      case GET:
        resp = this.http.get<T>(url);
        break;
      case POST:
        resp = this.http.post<T>(url, body, options);
        break;
      case PUT:
        resp = this.http.put<T>(url, body, options);
        break;
      case DELETE:
        resp = this.http.delete<T>(url);
        break;
    }

    const callInfo: HttpCallInfo = {
      serviceName: endpointObject.name,
      endpoint: httpMethod + ' ' + url,
      headers: options.headers,
      request: body,
      response: null,
    };

    this.logger.debug('Invocando Servicio ' + endpointObject.name);

    return resp.pipe(
      tap(rsp => {
        callInfo.response = rsp;
        this.logger.debug(toJson(callInfo));
      }),
      catchError((err, caught) => {
        callInfo.response = err.error.message;
        this.logger.httpLog(err.status, toJson(callInfo));
        return EMPTY;
      }),
    );
  }

}

import {HttpParam, ParamType} from './http.param';

export function toJson(obj: any): string {
  return JSON.stringify(obj);
}

export function fromJson(json: string): any {
  return JSON.parse(json);
}

export function createQueryString(params: HttpParam[]): any {
  let queryString = '';
  if (params != null && params.length > 0) {
    const queryParams = params.filter(item => item.type === ParamType.QUERY_PARAM);
    if (queryParams.length > 0) {
      queryString = '?' + queryParams.map(param => `${param.key}=${param.value}`).join('&');
    }
  }
  return queryString;
}

export function replacePathParams(params: HttpParam[], uri): any {
  if (params != null && params.length > 0) {
    const pathParams = params.filter(item => item.type === ParamType.PATH_PARAM);
    if (pathParams.length > 0) {
      pathParams.forEach(kv => {
        uri = uri.replace(kv.key, kv.value);
      });
    }
  }
  return uri;
}

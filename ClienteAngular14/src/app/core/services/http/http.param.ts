export enum ParamType {
  QUERY_PARAM, PATH_PARAM
}

export interface HttpParam {
  type: ParamType;
  key: string;
  value: string;
}

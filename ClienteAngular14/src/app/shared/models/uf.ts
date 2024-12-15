export interface IUFRsp {
  success: boolean;
  body: IBodyUf;
  return: IReturnUf;
}

export interface IBodyUf {
  ValorUF: boolean;
  Fecha: string;
  FechaDia: string;
}

export interface IReturnUf {
  code: string;
  message: string;
}





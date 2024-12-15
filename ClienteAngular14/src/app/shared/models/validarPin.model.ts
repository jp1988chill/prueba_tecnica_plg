export class ValidarPinBody {
  private rutcliente: string;
  private numeropin: string;
  private idchallenge: string;
  constructor(rutcliente: string, numeropin: string, idchallenge: string) {
    this.rutcliente = rutcliente;
    this.numeropin = numeropin;
    this.idchallenge = idchallenge;
  }
}

export class ValidarPinModel {
  public ValidaPin:   ValidarPinBody;
}

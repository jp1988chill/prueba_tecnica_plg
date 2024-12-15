export class LoginEnrolamientoModelBody {
  public rut: string;
  public claveDinamica: string;
  public numeroDeSerie: string;
  constructor(rut: string, claveDinamica: string, numeroDeSerie: string) {
    this.rut = rut;
    this.claveDinamica = claveDinamica;
    this.numeroDeSerie = numeroDeSerie;
  }
}

export class LoginEnrolamientoModel {
  public EnrolamientoModel:   LoginEnrolamientoModelBody;
}

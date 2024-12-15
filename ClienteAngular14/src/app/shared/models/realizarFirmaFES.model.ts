export class RealizarFirmaFESBody {
  private rut: string;
  private claveDinamica: string;
  private numeroDeSerie: string;
  private codigoDeConfirmacion: string;
  constructor(rut: string, claveDinamica: string, numeroDeSerie: string, codigoDeConfirmacion: string) {
    this.rut = rut;
    this.claveDinamica = claveDinamica;
    this.numeroDeSerie = numeroDeSerie;
    this.codigoDeConfirmacion = codigoDeConfirmacion;
  }
}

export class RealizarFirmaFESModel {
  public RealizaFirmaFESModel:   RealizarFirmaFESBody;
}

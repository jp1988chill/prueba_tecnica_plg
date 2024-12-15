import { ClienteModel } from 'src/app/models/documento.model';
export class FirmaDocumentoModel {
    claveSMS: string;
    clavePIN: string;
    constructor(sms : string, pin : string) {
      this.claveSMS = sms;
      this.clavePIN = pin;
  }
}

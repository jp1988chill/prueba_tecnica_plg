
import { Injectable } from "@angular/core";
import { ClienteModel } from 'src/app/models/documento.model';
import { LoginEnrolamientoModelBody, LoginEnrolamientoModel } from "src/app/shared/models/loginEnrolamiento.model";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  docCompartido: ClienteModel;
  usuarioLogeadoCompartido: LoginEnrolamientoModel;
  add(msg: ClienteModel) {
    this.docCompartido = msg;
  }
  addUsuarioLogeado(msg: LoginEnrolamientoModel) {
    this.usuarioLogeadoCompartido = msg;
  }
}

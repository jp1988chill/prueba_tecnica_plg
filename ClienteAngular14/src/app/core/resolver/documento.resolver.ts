import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ClienteModel } from "src/app/models/documento.model";
import { PreguntaService } from "../services/firma/pregunta.service";

@Injectable({
    providedIn: 'root'
})
export class DocumentoResolver implements Resolve<ClienteModel> {
    constructor(private preguntaSvc: PreguntaService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log("obteniendo datos desde el resolver");
        return this.preguntaSvc.obtenerDocumentos("");
    }

}

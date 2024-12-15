import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { ClienteModel } from 'src/app/models/documento.model';

@Injectable({
    providedIn: 'root'
})
 export class ClienteService{
     private urlClientes = environment.baseUrl + environment.endpoints.ObtenerClientes.path;

     private valueAutentificacion = environment.endpoints.ObtenerClientes.suscriptionKey;

     constructor(public http: HttpClient) {}

      public getObtenerClientes(): Observable<any> {
        const url = this.urlClientes;
    return this.http.get<any>(url);
      }


 }

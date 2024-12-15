import { Injectable } from "@angular/core";
import { env } from "process";
import { Observable } from "rxjs/internal/Observable";
import { ParamType } from "../http/http.param";
import { HttpService } from "../http/http.service";

@Injectable({
    providedIn: 'root'
})
export class PreguntaService {
    constructor(private http: HttpService) {
    }

    /**
     * Obtenemos las preguntas asociadas al rut, para validar la identidad.
     * @param rut Rut del cliente a consultar.
     * @returns returna las pregunas desde el backend.
     */
    public obtenerPreguntas(rut: string, numeroserie: string): Observable<any> {
        const params = [
            { type: ParamType.PATH_PARAM, key: '{rut}', value: rut },
			{type: ParamType.PATH_PARAM, key: '{numeroserie}', value: numeroserie},
        ];

        const body = {
            'rut': rut,
			'numeroserie': numeroserie,
        };

        return this.http.doPost1<any>(env => env.endpoints.pregunta, body);
    }

    /**
     * Metodo que permite validar las preguntas que ha respondido el usuario.
     * @returns Preguntas Validadas.
     */
    public validarPreguntas(body): Observable<any> {
        return this.http.doPost1<any>(env => env.endpoints.validarPreguntas, body);
     // return Observable<true>;
    }


    /**
     * Permite obtener los documentos asociados al token
     * @param token Token para obtener la documentacion
     * @returns Documentacion si existiera
     */
    public obtenerDocumentos(token: string): Observable<any> {
        return this.http.doGet1<any>( env => env.endpoints.solicitud);
    }
}

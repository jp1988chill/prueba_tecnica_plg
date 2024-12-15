import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpService} from '../http/http.service';
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpService) {
  }

  logout(): Observable<boolean> {
    return this.http.doGet1<boolean>(env => env.endpoints.logOut)
      .pipe(catchError((s) => {
        return of(false);
      }));
  }

  public getDigito(rut) {
    var dvr = '0';
    var suma = 0;
    var mul = 2;
    var i = 0;
    for (i = rut.length - 1; i >= 0; i--) {
      suma = suma + rut.charAt(i) * mul;
      if (mul == 7) {
        mul = 2;
      } else {
        mul++;
      }
    }
    var res = suma % 11;
    if (res == 1) {
      return 'k';
    } else if (res == 0) {
      return '0';
    } else {
      return 11 - res;
    }
  }

  public digitoCorrecto(crut) {
    var largo = crut.length;
    var rut = '';
    if (largo < 2) {
      return false;
    }
    if (largo > 2) {
      rut = crut.substring(0, largo - 1);
    } else {
      rut = crut.charAt(0);
    }
    var dv = crut.charAt(largo - 1);
    this.digitoValido(dv);
    if (rut == null || dv == null) {
      return 0;
    }
    if (this.getDigito(rut) != dv.toLowerCase()) {
      return false;
    }
    return true;
  }

  public digitoValido(dv) {
    if (dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k' && dv != 'K') {
      return false;
    }
    return true;
  }

  public quitarFormato(rut) {
    var strRut = new String(rut);
    while (strRut.indexOf(".") != -1) {
      strRut = strRut.replace(".", "");
    }
    while (strRut.indexOf("-") != -1) {
      strRut = strRut.replace("-", "");
    }
    return strRut;
  }

  public validarRut(texto){
    var scope = this;
    texto = this.quitarFormato(texto);
    var largo = texto.length;
    var i = 0;
    var j = 0;
    // rut muy corto
    if (largo < 2) {
      return false;
    }
    // verifica que los numeros correspondan a los de rut
    for (i = 0; i < largo; i++) {
      // numero o letra que no corresponda a los del rut
      if (!this.digitoValido(texto.charAt(i))) {
        return false;
      }
    }
    var invertido = "";
    for (i = (largo - 1), j = 0; i >= 0; i--, j++) {
      invertido = invertido + texto.charAt(i);
    }
    var dtexto = "";
    dtexto = dtexto + invertido.charAt(0);
    dtexto = dtexto + '-';
    var cnt = 0;
    for (i = 1, j = 2; i < largo; i++, j++) {
      if (cnt == 3) {
        dtexto = dtexto + '.';
        j++;
        dtexto = dtexto + invertido.charAt(i);
        cnt = 1;
      } else {
        dtexto = dtexto + invertido.charAt(i);
        cnt++;
      }
    }
    invertido = "";
    for (i = (dtexto.length - 1), j = 0; i >= 0; i--, j++) {
      invertido = invertido + dtexto.charAt(i);
    }
    if (this.digitoCorrecto(texto)) {
      return true;
    }
    return false;
  }
}


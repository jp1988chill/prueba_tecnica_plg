import { Observable } from 'rxjs';
import { Pregunta } from './../../shared/models/preguntas.model';
import { Alternativa } from './../../models/preguntas.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/core/services/firma/pregunta.service';
import { Preguntas } from 'src/app/models/preguntas.model';
import { ValidarPreguntasResponse } from 'src/app/models/validar-preguntas-response.model';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styles: []
})
export class QuestionsComponent implements OnInit {
  form: FormGroup;
  questions = {} as Preguntas;

  /**
   * Constructor del componente de Preguntas
   * @param fb Formbuilder para la creacion del form y validacion de los compentes.
   * @param router Manejador de rutas.
   * @param preguntaSvc Servicio para preguntas.
   */
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private preguntaSvc: PreguntaService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    let rut: string;
    let numDeSerie: string;
    this.route.queryParams.subscribe(param => {
      rut = param.rut;
      numDeSerie = param.numDeSerie;
    });


    this.preguntaSvc.obtenerPreguntas(rut, numDeSerie).toPromise().then(p => {
      console.log('------------------preguntas--------------------');
      console.log(p);
      this.questions = p as Preguntas;
      this.form = this.formBuilder.group({
        values: this.formBuilder.array(
          this.questions?.preguntas?.map(x => this.formBuilder.group({
            answer: ['', Validators.required]
          })
          )
        )
      });
    });

  }

  /**
   * Metodo para hacer submit del form, en este se validan que todas las preguntas tengan respuestas.
   */
  onSubmit() {
    // reset alerts on submit
    this.alertService.clear();

    if (this.form.valid) {
      const pregs = this.questions?.preguntas;
      const respuestasSeleccionadas = new Array();
      var answerMarked = this.form.get('values').value;
      answerMarked.forEach((currentValueResp, index) => {
        pregs.forEach((currentValue, indexPreg) => {
          var resp = currentValue.alternativas.find(cod => cod.codigorespuesta == currentValueResp.answer);
          if(resp != undefined){
            respuestasSeleccionadas.push({
              Pregunta: pregs[indexPreg],
              Alternativa: resp
            });
          }
        });
      });

      this.validarRespuestas(respuestasSeleccionadas).subscribe(
        r => {
          if (r?.codigo === "10000") {
            this.alertService.success('Preguntas recibidas. Cargando documentos.', { keepAfterRouteChange: false });
            setTimeout(() => {
              this.router.navigate(['/documentos'], {});
            }, 5000);  //5s
		  } 
		  else {
            this.alertService.error('Error: Las respuestas enviadas no tienen autorizaci�n para el usuario actual.');
          }
        },
        error => {
            this.alertService.error(error);
        }
      );
    }
  }

  /**
   * Permite hacer la validacion de las repuesta e invocar al servicio de validacion.
   * @returns devuelve verdadero si las respuestas estan ok, falso en caso contrario.
   */
  validarRespuestas(body): Observable<any> {
    return this.preguntaSvc.validarPreguntas(body);
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {UfValueService} from '../../core/services/ufvalue/ufvalue.service';
import {ParametryService} from '../../core/services/parametry/parametry.service';
import {finalize, isEmpty, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {LoginService} from "../../core/services/login/login.service";
import {SSOService} from "../../core/auth/sso.service";
import {AppStore} from "../../core/store/store";
import {LOGOUT} from "../../core/store/actions/user.actions";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/core/services/firma/pregunta.service';
import { ClienteService } from 'src/app/core/services/autentificacion/ClienteService.services';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import {CookieService} from 'ngx-cookie-service';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { ClienteModel } from 'src/app/models/documento.model';
import { Pipe } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe {
  public transform(value: string): string {
    return value.slice(0, 4) + " " + value.slice(4, 8) + " " + value.slice(8, 12);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PreguntaService],
})
export class HomeComponent implements OnInit, OnDestroy {

  preload: boolean = false;
  registerFirmaYa: boolean = true;
  user$ = this.appStore$.pipe(select(state => state.ssoUser));
  ngUnsubscribe = new Subject<void>();
  form: FormGroup;
  rut: string = '';
  clave: string = '';
  numDeSerie: string = '';
  submitForm: boolean = false;
  enrola: boolean = false;
  clientData: ClienteModel;
  phoneFormatter = new PhonePipe();

  constructor(private ufService: UfValueService,
              private preguntasServices: PreguntaService,
              private clienteServices: ClienteService,
              private parametryService: ParametryService,
              private loginService: LoginService,
              private ssoService: SSOService,
              private appStore$: Store<AppStore>,
              private fb: FormBuilder,
              private router: Router,
              private routeActivate: ActivatedRoute,
              private alertService: AlertService,
              private cookiesSvc:CookieService,
              private service: StorageService,
              private autenticacionservice: ClienteService
              ) {

          this.form = this.fb.group({
            rut: [this.rut, Validators.required],
            clave: [this.clave, Validators.required],
            numDeSerie: [this.numDeSerie, Validators.required]

          });

          if(this.routeActivate.snapshot.queryParams){
            this.rut = this.routeActivate.snapshot.queryParamMap.get('rut');
            this.numDeSerie = this.routeActivate.snapshot.queryParamMap.get('numDeSerie');
            this.clave = this.routeActivate.snapshot.queryParamMap.get('clave');
          }
          var result = this.clienteServices.getObtenerClientes();
          result.subscribe(data => {

            this.clientData = data;

            console.log('ClientData:');
            console.log(this.clientData);
          })
      }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    let rutEnrola: string;
    this.routeActivate.queryParams.subscribe(param => {
      rutEnrola = param.rut;
    });

    this.routeActivate.queryParams.subscribe(param => {
      const {rut, token} = param;
      this.rut = rut || '';
      this.clave = token || '';

    });

    let resEnr = {
      codigo_retorno: '',
      mensaje_retorno: ''
    };

    var that = this;
    this.getParametry();
    this.postPreguntas();
    this.llenaForm();
  }


  getParametry() {

    this.parametryService.getParametry('ACCEDG')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((rsp) => {
        // do something
      });
  }


  logout() {
    this.loginService.logout()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => this.appStore$.dispatch(LOGOUT()))
      )
      .subscribe((rsp) => {
      });
  }

  validacionRut(rut){
    return this.loginService.validarRut(rut);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }


  llenaForm(){

  }

  cookieEnrola() {

  }

  formLogin() {
  }

  ingresarAPreguntas() {

  }

  validarEnrolamiento() {

  }

  postPreguntas() {

  }
}

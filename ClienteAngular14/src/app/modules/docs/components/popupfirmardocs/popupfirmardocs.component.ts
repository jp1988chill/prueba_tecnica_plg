import { FirmaDocumentoModel } from './../../../../models/firmaDocumento.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/core/services/autentificacion/ClienteService.services';

@Component({
  selector: 'app-popupfirmardocs',
  templateUrl: './popupfirmardocs.component.html',
  styleUrls: ['./popupfirmardocs.component.scss'],
})
export class ModalFirmarDocsComponent implements OnInit {

  form: FormGroup;
  claveSMS: string = '';
  clavePIN: string = '';

  constructor(private dialog: MatDialog, public service: StorageService, private fb: FormBuilder,
    private routeActivate: ActivatedRoute, private clienteServices: ClienteService
    ) {
    this.form = this.fb.group({
      claveSMS: [this.claveSMS, Validators.required],
      clavePIN: [this.clavePIN, Validators.required]

    });

    if(this.routeActivate.snapshot.queryParams){
      this.claveSMS = this.routeActivate.snapshot.queryParamMap.get('claveSMS');
      this.clavePIN = this.routeActivate.snapshot.queryParamMap.get('clavePIN');
    }
  }

  ngOnInit(): void {}

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

  formLogin(){

  }

}

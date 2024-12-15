import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticeComponent } from 'src/app/shared/components/notice/notice.component';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { ClienteService } from 'src/app/core/services/autentificacion/ClienteService.services';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RealizarFirmaFESBody, RealizarFirmaFESModel } from 'src/app/shared/models/realizarFirmaFES.model';
import { ValidarPinBody, ValidarPinModel } from 'src/app/shared/models/validarPin.model';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { CommonModule } from '@angular/common';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-modal-firma-fes',
  templateUrl: './modal-firma-fes.component.html',
  providers: [
    CommonModule,
    AppModule
  ],
})
export class ModalFirmaFesComponent implements OnInit {
  public codConfirmacion: string = '';
  constructor(
    public dialogRef: MatDialogRef<ModalFirmaFesComponent>,
    private snackbar: MatSnackBar, public service: StorageService,
    public clienteServices: ClienteService,
    private alertService: AlertService,
    ) {
      console.log("evento popup firma FES");
    }

  ngOnInit(): void {
    this.solicitarPinFES();
  }

  validarCodConfirmacionFES(){

  }

  solicitarPinFES(){

  }

  resendSms(){
    this.snackbar.openFromComponent(NoticeComponent, {
      data: {
        type: 'success',
        message: `<strong>SMS Reenviado</strong><br><span>Se ha enviado un mensaje de
        texto a +569 8*****66</span>`
      }
    });
  }

}

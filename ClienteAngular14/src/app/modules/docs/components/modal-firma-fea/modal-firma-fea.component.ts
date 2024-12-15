import { Component, Inject, forwardRef, OnInit, Host, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { ModalFirmarDocsComponent } from '../popupfirmardocs/popupfirmardocs.component';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AppModule } from './../../../../app.module';
import { CommonModule }   from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { ClienteService } from 'src/app/core/services/autentificacion/ClienteService.services';
import { DocsComponent } from 'src/app/modules/docs/docs.component';

@Component({
  selector: 'app-modal-firma-fea',
  templateUrl: './modal-firma-fea.component.html',
  providers: [
    CommonModule,
    AppModule
  ],
})
export class ModalFirmaFeaComponent implements OnInit {
  submitFirmaYa: boolean = false;
  private subscription: Subscription;

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ModalFirmaFeaComponent>, public service: StorageService, private alertService: AlertService,
    app: AppModule, private clienteServices: ClienteService
    ) {

  }

  revisaValidezFirmaYA() {

  }

  ngOnInit(): void {
    this.closeFirmaFeaButton();
  }

  ngOnDestroy(): void {
    this.closeFirmaFeaButton();
  }

  openPopupModalFirmaYa(){
    this.submitFirmaYa = true;
    // Wait for the given amount of time
    this.subscription = interval(5000)
    .subscribe(x => { this.revisaValidezFirmaYA(); });

    //aqu? va la URL del documento a firmar...
      this.dialog.open(ModalFirmarDocsComponent, {
        width: '400px',
        autoFocus: false
      });
  }

  closeFirmaFeaButton(){
    if(this.alertService){
      // reset alerts on close
      this.alertService.clear();
    }
    if(this.subscription){
      this.subscription.unsubscribe(); //stop timer
    }
  }
}

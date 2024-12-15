import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClienteModel } from 'src/app/models/documento.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { NoticeComponent } from 'src/app/shared/components/notice/notice.component';
import { ModalFirmaFeaComponent } from './components/modal-firma-fea/modal-firma-fea.component';
import { ModalFirmaFesComponent } from './components/modal-firma-fes/modal-firma-fes.component';
import { ModalHelpComponent } from './components/modal-help/modal-help.component';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styles: [
  ]
})
export class DocsComponent implements OnInit {
  public documento: ClienteModel;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) {
      this.activatedRoute.data.subscribe(response => {
        this.documento = response.data as ClienteModel;
      });
    }

  preload: boolean = false;
  public success: boolean = false; //avanza de FEA a FES
  sidenavFirmantes: boolean = true;
  @ViewChild(MatStepper) stepper:  MatStepper;

  ngOnInit(): void {}

  openModalFirmaFea(){
    this.dialog.open(ModalFirmaFeaComponent, {
      width: '420px',
      maxHeight: '95vh',
      minHeight: '600px',
      maxWidth: '95vw',
      autoFocus: false,
      disableClose: true,
    }).afterClosed().subscribe(res => {
       if(res.response){
          if(res.response.firmado == true){
            this.success = true;
            this.snackbar.openFromComponent(NoticeComponent, {
              data: {
                type: 'success',
                message: `<strong>Operación exitosa</strong><br><span>Documentos firmados</span>`
              }
            });
            window.scrollTo(0,0);
          }
       }
    });
  }

  openModalFirmaFes(){
    this.dialog.open(ModalFirmaFesComponent, {
      width: '420px',
      maxHeight: '95vh',
      minHeight: '600px',
      maxWidth: '95vw',
      autoFocus: false,
      disableClose: true,
    }).afterClosed().subscribe(res => {


      //RestAPI "realizarfirma" validación SMS aca "botón Firmar" (2/2)
      //estadoverificacionsms == true, estadoverificacionsms == false
      if( (res) && (res.response.estadoverificacionsms == true)){
          this.preload = true;
          setTimeout(() => {
            this.preload = false;
            this.success = true;
            this.snackbar.openFromComponent(NoticeComponent, {
              data: {
                type: 'success',
                message: `<strong>Operación exitosa</strong><br><span>Documentos firmados</span>`
              }
            });
            window.scrollTo(0,0);
          },6000);
      }
    });
  }

  next(){
    this.stepper.next();
    this.success = false;
    window.scrollTo(0,0);
  }

  openModalhelp(){
    this.dialog.open(ModalHelpComponent,{
      width: '345px',
      autoFocus: false
    });
  }

}

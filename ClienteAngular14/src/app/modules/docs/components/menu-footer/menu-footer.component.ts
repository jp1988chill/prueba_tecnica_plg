import { Component, OnInit, Input, InjectionToken, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DocumentosComponent } from '../documentos/documentos.component';
import { FirmantesComponent } from '../firmantes/firmantes.component';
import { ClienteModel } from 'src/app/models/documento.model';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html'
})
export class MenuFooterComponent implements OnInit {
  @Input() documentoPorMenuFooter:  ClienteModel;

  constructor(
    private bottomSheet: MatBottomSheet, private service: StorageService) { }



  ngOnInit(): void {
    if(!(this.documentoPorMenuFooter === undefined)){
      this.service.add(this.documentoPorMenuFooter);
    }
  }

  openFirmantes(){
    this.bottomSheet.open(FirmantesComponent);
  }

  openDocs(){
	  this.bottomSheet.open(DocumentosComponent);
  }

}

import { Component, OnInit, Input, Output, EventEmitter, Optional, InjectionToken, Injectable } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDrawer } from '@angular/material/sidenav';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { MenuFooterComponent } from 'src/app/modules/docs/components/menu-footer/menu-footer.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html'
})
export class DocumentosComponent implements OnInit {

  constructor(
    @Optional() private documentosBottomSheet: MatBottomSheetRef,
    public service: StorageService,
    @Optional() private drawerNav: MatDrawer) { }

  @Input() drawer: boolean = false;

  ngOnInit(): void {}

  close(){
    if(!this.drawer){
      this.documentosBottomSheet.dismiss();
    }else{
      this.drawerNav.close();
    }
  }

}

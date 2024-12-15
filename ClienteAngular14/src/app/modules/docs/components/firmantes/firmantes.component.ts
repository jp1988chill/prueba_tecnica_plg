import { Component, OnInit, Input, Output, EventEmitter, InjectionToken, Injectable , Optional } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { StorageService } from 'src/app/modules/docs/components/base-component';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-firmantes',
  templateUrl: './firmantes.component.html'
})
export class FirmantesComponent implements OnInit {

  constructor(
	@Optional() private firmantesBottomSheet: MatBottomSheetRef,
	public service: StorageService,
	@Optional() private drawerNav: MatDrawer
  ) {
     //console.log(service.docCompartido);
   }
  @Input() drawer: boolean = false;

  firmantes= {

  }
  data = Object.values(this.firmantes);

  ngOnInit(): void {

  }

  close(){
    if(!this.drawer){
      this.firmantesBottomSheet.dismiss();
    }else{
      this.drawerNav.close();
    }
  }

}

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalCarpetaComponent} from './modal-carpeta/modal-carpeta.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {LazyElementsModule} from '@angular-extensions/elements';
import {MatIconModule} from '@angular/material/icon';
import { ModalCarnetComponent } from './modal-carnet/modal-carnet.component';


@NgModule({
  declarations: [
    ModalCarpetaComponent,
    ModalCarnetComponent
  ],
  imports: [
    CommonModule,
    LazyElementsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  entryComponents: [
    ModalCarpetaComponent
  ],
  exports: [
    ModalCarpetaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalsModule {
}

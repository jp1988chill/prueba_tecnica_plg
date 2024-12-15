import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocComponent } from './components/doc/doc.component';
import { ModalDocComponent } from './components/modal-doc/modal-doc.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MenuFooterComponent } from './components/menu-footer/menu-footer.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FirmantesComponent } from './components/firmantes/firmantes.component';
import { FirmanteComponent } from './components/firmante/firmante.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { ModalFirmaFeaComponent } from './components/modal-firma-fea/modal-firma-fea.component';
import { ModalFirmarDocsComponent } from './components/popupfirmardocs/popupfirmardocs.component';
import { ModalFirmaFesComponent } from './components/modal-firma-fes/modal-firma-fes.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ModalHelpComponent } from './components/modal-help/modal-help.component';

@NgModule({
  declarations: [DocsComponent, DocComponent, ModalDocComponent, MenuFooterComponent, FirmantesComponent, FirmanteComponent, DocumentosComponent, ModalFirmaFeaComponent, ModalFirmarDocsComponent, ModalFirmaFesComponent, ModalHelpComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    SharedModule,
    MatStepperModule,
    MatTooltipModule,
    PdfViewerModule,
    MatBottomSheetModule,
    MatSidenavModule
  ]
})
export class DocsModule { }

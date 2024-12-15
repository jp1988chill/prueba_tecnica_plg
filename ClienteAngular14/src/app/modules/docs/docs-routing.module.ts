import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentoResolver } from 'src/app/core/resolver/documento.resolver';
import { DocsComponent } from './docs.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    resolve: {data: DocumentoResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }

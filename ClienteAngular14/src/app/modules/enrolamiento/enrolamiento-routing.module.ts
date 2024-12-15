import {RouterModule, Routes} from '@angular/router';
import {EnrolamientoComponent} from './enrolamiento.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: EnrolamientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrolamientoRoutingModule {
}

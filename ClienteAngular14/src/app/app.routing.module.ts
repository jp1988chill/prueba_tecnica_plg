import {Routes} from '@angular/router';
import {AuthGuardService} from './core/guards/auth-guard.service';

export const routes: Routes = [
  {
    path: 'enrolamiento',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./modules/enrolamiento/enrolamiento.module').then(m => m.EnrolamientoModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'ayuda',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./modules/help/help.module').then(m => m.HelpModule)
  },
  {
    path: 'preguntas',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule)
  },
  {
    path: 'documentos',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./modules/docs/docs.module').then(m => m.DocsModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

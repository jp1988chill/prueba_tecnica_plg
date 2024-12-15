import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PlatformModule} from '@angular/cdk/platform';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '../core/store/effects';
import {PipesModule} from './pipes/pipes.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloadComponent } from './components/preload/preload.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoticeComponent } from './components/notice/notice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NoticeComponent,
    PreloadComponent,
    AlertComponent
  ],
  entryComponents: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    FooterComponent,
    NoticeComponent,
    PreloadComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlatformModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    EffectsModule.forFeature([UserEffects])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}

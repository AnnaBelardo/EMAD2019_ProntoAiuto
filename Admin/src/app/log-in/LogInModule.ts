import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import {LogInComponent} from './log-in.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {AngularMaterialModule} from '../angular-material.module';


@NgModule({
  imports: [
    CommonModule,
AngularMaterialModule,
  ],
  exports: [
    LogInComponent
  ],
  declarations: [
    LogInComponent
  ],
  providers: [
  ],
})
export class LogInModule {
}

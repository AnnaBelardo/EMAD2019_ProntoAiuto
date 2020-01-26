import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {VettureCreateComponent} from './VettureCreateComponent';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    VettureCreateComponent
  ],
  declarations: [
    VettureCreateComponent,
  ],
  providers: [],
})
export class VettureCreateModule {
}

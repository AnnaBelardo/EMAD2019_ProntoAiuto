import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {VetturaUpdateComponent} from './VetturaUpdateComponent';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    VetturaUpdateComponent
  ],
  declarations: [
    VetturaUpdateComponent,
  ],
  providers: [],
})
export class VetturaUpdateModule {
}

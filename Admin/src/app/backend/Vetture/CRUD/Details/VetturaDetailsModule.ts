import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {VetturaDetailsComponent} from './VetturaDetailsComponent';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    VetturaDetailsComponent
  ],
  declarations: [
    VetturaDetailsComponent
  ],
  providers: [],
})
export class VetturaDetailsModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {RichiestaDetailsComponent} from './RichiestaDetailsComponent';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    RichiestaDetailsComponent
  ],
  declarations: [
    RichiestaDetailsComponent
  ],
  providers: [],
})
export class RichiestaDetailsModule {
}

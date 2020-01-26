import {NgModule} from '@angular/core';
import {VettureListComponent} from './VettureListComponent';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    VettureListComponent
  ],
  declarations: [
    VettureListComponent
  ],
  providers: [],
})
export class VettureListModule {
}

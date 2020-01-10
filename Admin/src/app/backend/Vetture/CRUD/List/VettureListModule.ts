import {NgModule} from '@angular/core';
import {VettureListComponent} from './VettureListComponent';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
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

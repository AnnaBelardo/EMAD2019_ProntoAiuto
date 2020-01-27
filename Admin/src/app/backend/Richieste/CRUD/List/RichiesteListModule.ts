import {NgModule} from '@angular/core';
import {RichiesteListComponent} from './RichiesteListComponent';
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
    RichiesteListComponent
  ],
  declarations: [
    RichiesteListComponent
  ],
  providers: [],
})
export class RichiesteListModule {
}

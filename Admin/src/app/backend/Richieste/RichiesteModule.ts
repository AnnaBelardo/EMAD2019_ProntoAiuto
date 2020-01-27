import {NgModule} from '@angular/core';
import {RichiesteResource} from './services/RichiesteResource';
import {RichiesteService} from './services/RichiesteService';
import {RichiesteListModule} from './CRUD/List/RichiesteListModule';


@NgModule({
  imports: [
    RichiesteListModule,
  ],
  exports: [
    RichiesteListModule,
  ],
  declarations: [
  ],
  providers: [
    RichiesteResource,
    RichiesteService,
  ],
})
export class RichiesteModule {
}

import {NgModule} from '@angular/core';
import {RichiesteResource} from './services/RichiesteResource';
import {RichiesteService} from './services/RichiesteService';
import {RichiesteListModule} from './CRUD/List/RichiesteListModule';
import {RichiestaDetailsModule} from './CRUD/Details/RichiestaDetailsModule';


@NgModule({
  imports: [
    RichiesteListModule,
    RichiestaDetailsModule
  ],
  exports: [
    RichiesteListModule,
    RichiestaDetailsModule
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

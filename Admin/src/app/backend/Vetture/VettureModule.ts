import {NgModule} from '@angular/core';
import {VettureListModule} from './CRUD/List/VettureListModule';
import {VettureResource} from './services/VettureResource';
import {VettureService} from './services/VettureService';


@NgModule({
  imports: [
    VettureListModule
  ],
  exports: [
    VettureListModule
  ],
  declarations: [],
  providers: [
    VettureResource,
    VettureService
  ],
})
export class VettureModule {
}

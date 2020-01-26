import {NgModule} from '@angular/core';
import {VettureListModule} from './CRUD/List/VettureListModule';
import {VettureResource} from './services/VettureResource';
import {VettureService} from './services/VettureService';
import {VettureCreateModule} from './CRUD/Create/VettureCreateModule';
import {UniqueIdentificativoValidatorDirective} from './CRUD/Directives/identificativo.directive';
import {ValidatorsService} from './services/ValidatorsService';
import {ValidatorsResource} from './services/ValidatorsResource';
import {VetturaUpdateModule} from './CRUD/Update/VetturaUpdateModule';


@NgModule({
  imports: [
    VettureListModule,
    VettureCreateModule,
    VetturaUpdateModule
  ],
  exports: [
    VettureListModule,
    VettureCreateModule,
    VetturaUpdateModule
  ],
  declarations: [
    UniqueIdentificativoValidatorDirective
  ],
  providers: [
    VettureResource,
    VettureService,
    ValidatorsService,
    ValidatorsResource
  ],
})
export class VettureModule {
}

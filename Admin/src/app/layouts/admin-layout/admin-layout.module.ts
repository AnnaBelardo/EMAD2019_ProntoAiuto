import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {HttpClientModule} from '@angular/common/http';
import {VettureModule} from '../../backend/Vetture/VettureModule';
import {RichiesteModule} from '../../backend/Richieste/RichiesteModule';
import {RichiesteResource} from '../../backend/Richieste/services/RichiesteResource';
import {RichiesteService} from '../../backend/Richieste/services/RichiesteService';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    MatBottomSheetModule,
    VettureModule,
    RichiesteModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ],
  providers: [
    RichiesteResource,
    RichiesteService,
  ],
})

export class AdminLayoutModule {}

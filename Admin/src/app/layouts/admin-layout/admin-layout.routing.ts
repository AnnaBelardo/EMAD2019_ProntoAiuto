import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {VettureListComponent} from '../../backend/Vetture/CRUD/List/VettureListComponent';
import {VettureCreateComponent} from '../../backend/Vetture/CRUD/Create/VettureCreateComponent';
import {VetturaUpdateComponent} from '../../backend/Vetture/CRUD/Update/VetturaUpdateComponent';
import {RichiesteListComponent} from '../../backend/Richieste/CRUD/List/RichiesteListComponent';
import {RichiestaDetailsComponent} from '../../backend/Richieste/CRUD/Details/RichiestaDetailsComponent';
import {VetturaDetailsComponent} from '../../backend/Vetture/CRUD/Details/VetturaDetailsComponent';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'vetture/list',   component: VettureListComponent },
    { path: 'richieste/list',   component: RichiesteListComponent },
    { path: 'richieste/details/:id',   component: RichiestaDetailsComponent },
    { path: 'vetture/details/:id',   component: VetturaDetailsComponent },
    { path: 'vetture/create', component: VettureCreateComponent },
    { path: 'vettura/update/:id', component: VetturaUpdateComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];

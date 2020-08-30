import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../http.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { ToastrModule } from "ngx-toastr";
import { AdminLayoutRoutes } from './admin-layout.routing';
import {NgxLoadingModule} from "ngx-loading"

import { GovernDashboardComponent }       from '../../pages/goverdashboard/dashboard.component';
import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { ContactComponent }      from '../../pages/contact/contact.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { NgbdSortableHeader } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ToastrModule.forRoot(),
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxLoadingModule
  ],
  declarations: [
    DashboardComponent,
    GovernDashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    ContactComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    NgbdSortableHeader
  ],
  providers: [HttpService]
})

export class AdminLayoutModule {}

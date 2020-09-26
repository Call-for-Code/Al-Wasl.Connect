import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DisplayUsersComponent } from './display-users.component';
import { SidebarModule } from '../sidebar/sidebar.module';


@NgModule({
  declarations: [
    DisplayUsersComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule,
  ]
})
export class DisplayModule { }

import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DonorComponent } from './pages/donor/donor.component';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

export const AppRoutes: Routes = [
  { path: 'login',           component: LoginComponent},
  { path: 'register',           component: RegisterComponent},
  { path: 'donor',           component: DonorComponent},
  {path:'welcome', component:WelcomeComponent},
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },{
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'welcome'
  }
]

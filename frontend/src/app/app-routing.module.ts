import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { BusinessManagerComponent } from './modules/business-manager/pages/business-manager/business-manager.component';
import { BusinessComponent } from './modules/business/pages/business/business.component';

import { HomeComponent } from './modules/home/pages/home/home.component'
import { ProfileComponent } from './modules/profile/pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'business/:name',
    component: BusinessComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'management/business',
    component: BusinessManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**' , redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '../../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component'

@NgModule({
  declarations: [HomeComponent, WelcomeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }

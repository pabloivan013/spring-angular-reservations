// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthenticationButtonComponent } from './components/auth/authentication-button/authentication-button.component';
import { LogoutButtonComponent } from './components/auth/logout-button/logout-button.component';
import { LoginButtonComponent } from './components/auth/login-button/login-button.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToggleThemeComponent } from './components/toggle-theme/toggle-theme.component';
import { SignupButtonComponent } from './components/auth/signup-button/signup-button.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileButtonComponent } from './components/auth/profile-button/profile-button.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { BusinessScheduleDisplayComponent } from './components/business-schedule-display/business-schedule-display.component';
import { BusinessInfoCardComponent } from './components/business-info-card/business-info-card.component';

@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent,
    AuthenticationButtonComponent, 
    LogoutButtonComponent, 
    LoginButtonComponent, 
    ErrorComponent, 
    LoadingComponent, 
    ToggleThemeComponent, 
    SignupButtonComponent, 
    SearchComponent, 
    ProfileButtonComponent, 
    TimepickerComponent, 
    BusinessScheduleDisplayComponent, 
    BusinessInfoCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot()
  ],
  exports: [
    FooterComponent, 
    HeaderComponent,
    AuthenticationButtonComponent, 
    LogoutButtonComponent, 
    LoginButtonComponent, 
    ErrorComponent, 
    LoadingComponent, 
    ToggleThemeComponent, 
    SignupButtonComponent, 
    SearchComponent,
    ProfileButtonComponent,
    TimepickerComponent,
    BusinessScheduleDisplayComponent,
    BusinessInfoCardComponent,

    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TimepickerModule
  ]
})
export class SharedModule { }

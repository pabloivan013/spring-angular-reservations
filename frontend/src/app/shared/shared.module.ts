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
    TimepickerComponent
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

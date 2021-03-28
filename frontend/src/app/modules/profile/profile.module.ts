import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';

import { SharedModule } from '../../shared/shared.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ReservationDisplayComponent } from './components/reservation-display/reservation-display.component';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';

@NgModule({
  declarations: [ProfileComponent, ProfileCardComponent, ReservationDisplayComponent, ReservationCardComponent],
  imports: [
    CommonModule,
    SharedModule 
  ]
})
export class ProfileModule { }

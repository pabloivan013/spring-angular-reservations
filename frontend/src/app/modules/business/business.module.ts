import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './pages/business/business.component';

import { SharedModule } from '../../shared/shared.module';
import { BusinessDescriptionCardComponent } from './components/business-description-card/business-description-card.component';
import { ReservationPickerDisplayComponent } from './components/reservation-picker-display/reservation-picker-display.component';
import { ReservationTimesComponent } from './components/reservation-times/reservation-times.component';

@NgModule({
  declarations: [BusinessComponent, BusinessDescriptionCardComponent, ReservationPickerDisplayComponent, ReservationTimesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BusinessModule { }

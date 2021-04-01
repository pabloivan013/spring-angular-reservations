import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './pages/business/business.component';

import { SharedModule } from '../../shared/shared.module';
import { ReservationPickerDisplayComponent } from './components/reservation-picker-display/reservation-picker-display.component';
import { ReservationTimesComponent } from './components/reservation-times/reservation-times.component';

@NgModule({
  declarations: [BusinessComponent, ReservationPickerDisplayComponent, ReservationTimesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BusinessModule { }

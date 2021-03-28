import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessManagerComponent } from './pages/business-manager/business-manager.component';

import { SharedModule } from '../../shared/shared.module';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { BusinessDisplayComponent } from './components/business-display/business-display.component';
import { BusinessExpansionPanelComponent } from './components/business-expansion-panel/business-expansion-panel.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ReservationDescriptionComponent } from './components/reservation-description/reservation-description.component';
import { ReservationsTableComponent } from './components/reservations-table/reservations-table.component';

@NgModule({
  declarations: [BusinessManagerComponent, BusinessCardComponent, BusinessDisplayComponent, BusinessExpansionPanelComponent, ScheduleFormComponent, ReservationDescriptionComponent, ReservationsTableComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BusinessManagerModule { }

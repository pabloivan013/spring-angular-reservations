import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/models';
import { Business } from 'src/app/models/business.model';
import { UserService } from 'src/app/services/user.service';
import { ReservationDescriptionComponent } from '../reservation-description/reservation-description.component';
import { MatTab, MatTabChangeEvent } from '@angular/material/tabs';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { ReservationsTableComponent } from '../reservations-table/reservations-table.component';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    } as Intl.DateTimeFormatOptions,
  }
};

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },
  ]
})
export class BusinessCardComponent implements OnInit, AfterViewInit {

  @Input() business: Business

  expandedElement: Reservation | null;

  @ViewChild(ReservationsTableComponent) ReservationsTable: ReservationsTableComponent

  ngAfterViewInit() {
  }

  constructor(
    private userService: UserService, 
    private readonly adapter: DateAdapter<Date>
    ) { }

  ngOnInit(): void {
    this.adapter.setLocale(navigator.language)
  }

  tabChange($event: MatTabChangeEvent) {
    if ($event.tab.textLabel == 'reservations') 
      this.ReservationsTable.fetchReservations()
  }


}



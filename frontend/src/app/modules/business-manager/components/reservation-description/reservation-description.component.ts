import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models';
import { ReservationDescription } from 'src/app/models/reservationDescription.model';

@Component({
  selector: 'app-reservation-description',
  templateUrl: './reservation-description.component.html',
  styleUrls: ['./reservation-description.component.scss']
})
export class ReservationDescriptionComponent implements OnInit {

  @Input()reservation: Reservation

  reservationDescription : ReservationDescription 

  constructor() { }

  ngOnInit(): void {
    this.reservationDescription = this.reservation.description
    this.reservation.calculateDescription()
  }

  calculateReservationDescription() {
    this.reservation.calculateDescription()
  }

}

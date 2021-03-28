import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models';
import { ReservationDescription } from 'src/app/models/reservationDescription.model';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.scss']
})
export class ReservationCardComponent implements OnInit {

  @Input() reservation: Reservation

  description: ReservationDescription

  constructor() { }

  ngOnInit(): void {
    this.description = this.reservation.description
  }

}

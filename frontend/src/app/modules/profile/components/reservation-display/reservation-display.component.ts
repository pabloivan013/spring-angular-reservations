import { OnChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservation-display',
  templateUrl: './reservation-display.component.html',
  styleUrls: ['./reservation-display.component.scss']
})
export class ReservationDisplayComponent implements OnInit, OnChanges {

  @Input() reservations: Reservation[]

  nextReservations: Reservation[]

  pastReservations: Reservation[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.nextReservations = []
    this.pastReservations = []
    this.clasificateReservations()
  }

  clasificateReservations() {
    let now = Date.now()
    this.reservations.filter(r => r.reservedAt).forEach(r => {
      r.calculateDescription()
      r.description.datePassed ? this.pastReservations.push(r) : this.nextReservations.push(r)
    })
  }

}

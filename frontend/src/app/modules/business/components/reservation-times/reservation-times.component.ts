import { EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Output } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models';
import { OperationTime } from 'src/app/models/operationTime.model';

export const MS_PER_MINUTE = 60000;

enum ReservationStatus {
  AVAILABLE = "Available",
  EXPIRED   = "Expired",
  TAKED     = "Taked"
}

interface TimeInfo {
  date: Date,
  valid: boolean,
  status: ReservationStatus
}

@Component({
  selector: 'app-reservation-times',
  templateUrl: './reservation-times.component.html',
  styleUrls: ['./reservation-times.component.scss']
})
export class ReservationTimesComponent implements OnInit, OnChanges {

  @Input() operationTime: OperationTime
  @Input() datePicked: Date
  @Input() offset: number

  @Input() reservationsTaked : Reservation[] = []
  @Output() onTimePicked = new EventEmitter()

  displayedColumns: string[] = ['dateTime', 'options', 'status'];
  reservationDates: TimeInfo[] = []

  @Input() businessTimezoneFormat: string

  // Map of the original time showed in the business timezone, and the correct UTC time to be send.
  reservationMap: Map<Date,Date> = new Map()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reservationDates = []
    this.generateReservationTimes()
  }

  onTimeSelected(element) {
    this.onTimePicked.emit(element.date)
  }

  containsElement(reservations: Reservation[], date: Date) {
    for (let  res of reservations.values()) {
      if (res.reservedAt.getTime() == date.getTime()) 
        return true
    }
    return false
  }


  //Etc/GMT+2
  generateReservationTimes() {
    const MS_PER_MINUTE = 60000;
    let intervalTime = this.operationTime.intervalTime
    let offset = this.offset
    let start = new Date(Date.UTC(
      this.datePicked.getFullYear(),
      this.datePicked.getMonth(), 
      this.datePicked.getDate()
    ))
    
    // Take dates to the original business timezone, substract the offset
    // This will make show the UTC time like the original business timezone
    let startOriginal = new Date(this.operationTime.start.getTime() - (MS_PER_MINUTE * offset))
    let endOriginal   = new Date(this.operationTime.end.getTime() - (MS_PER_MINUTE * offset))

    start.setUTCHours(startOriginal.getUTCHours(), startOriginal.getUTCMinutes())

    // Restore original UTC
    start.setTime(start.getTime() + (MS_PER_MINUTE * offset))
    
    let diff = Math.abs(startOriginal.getTime() - endOriginal.getTime())
    let end = new Date(start.getTime() + diff )
    
    let _reservation = new Date(start)
    
    // Fill the array of dates with reservation times on business timezone
    let now = new Date(Date.now())
    while (_reservation >= start 
          && _reservation.getTime() <= (end.getTime() - intervalTime * MS_PER_MINUTE)
          && intervalTime > 0
      ) {
        let status = ReservationStatus.AVAILABLE
        let valid: boolean
        
        if (_reservation.getTime() < now.getTime()) 
          status = ReservationStatus.EXPIRED

        if(this.containsElement(this.reservationsTaked, _reservation)) 
          status = ReservationStatus.TAKED
        
        valid = (status == ReservationStatus.AVAILABLE) ? true : false

        this.reservationDates.push({date:_reservation, valid, status} as TimeInfo)
        _reservation = new Date(_reservation.getTime() + intervalTime * MS_PER_MINUTE)
    }
  }

}

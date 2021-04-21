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


  /**
   * Manages the time as if was the original business timezone, based on the UTC
   * Uses the UTC Z to make the calculations
   * Takes the datePicked (YY/MM/DD) and converts it in a 00:00 (YY/MM/DD:T:00:00) UTC Z time to
   * simulate the business time
   * 
   * The START and END times from the operation time are also converted to his original time
   * (subtracting the offset). The START and END be will between 00:00 - 23:59 Z.
   * 
   * Once the START and END dates are set(YY/MM/DD), they should be restored adding the offset
   * 
   * Example: 
   * A new business (GMT-2) set a operation times of a day (MONDAY) with:
   * START: 21:00 - END 23:00. This will make the UTC time be: START: 23:00Z - END: 01:00Z (adds 2)
   * The START and END will be on different days.
   * 
   * 
   * When a Date is picked (day from the schedule), (2021/04/19), a UTC time is made using it
   * 2021/04/19T00:00Z. This time simulates the business date.
   * 
   * The START(23:00Z) and END (01:00Z) are set to 21:00Z - 23:00Z, subtracting the business offset (2)
   * 
   * The result of setting the START and END UTC HOURS to the date picked will be:
   * START 2021/04/19T21:00Z - END 2021/04/19T23:00Z. This is like the original time BUT using UTC.
   * 
   * Now this time should be restored using the subtracted offset (+2)
   * START: 2021/04/19T23:00Z - END: 2021/04/20T01:00Z
   * 
   * 
   */
  generateReservationTimes() {
    const MS_PER_MINUTE = 60000;
    let intervalTime = this.operationTime.intervalTime
    let offset = this.offset

    let start = new Date(Date.UTC(
      this.datePicked.getFullYear(),
      this.datePicked.getMonth(), 
      this.datePicked.getDate()
    ))

    let end = new Date(Date.UTC(
      this.datePicked.getFullYear(),
      this.datePicked.getMonth(), 
      this.datePicked.getDate()
    ))

    // Take dates to the original business timezone, substract the offset
    // This will make show the UTC time like the original business timezone
    let startOriginal = new Date(this.operationTime.start.getTime() - (MS_PER_MINUTE * offset))
    let endOriginal   = new Date(this.operationTime.end.getTime() - (MS_PER_MINUTE * offset))

    start.setUTCHours(startOriginal.getUTCHours(), startOriginal.getUTCMinutes())
    end.setUTCHours(endOriginal.getUTCHours(), endOriginal.getUTCMinutes())

    // Restore original UTC
    start.setTime(start.getTime() + (MS_PER_MINUTE * offset))
    end.setTime(end.getTime() + (MS_PER_MINUTE * offset))

    //let diff = Math.abs(startOriginal.getTime() - endOriginal.getTime())
    //let end = new Date(start.getTime() + diff )
    
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

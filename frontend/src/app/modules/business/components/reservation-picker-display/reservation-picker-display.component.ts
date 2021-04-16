import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models';
import { Day } from 'src/app/models/day.model';
import { OperationTime } from 'src/app/models/operationTime.model';
import { ReservationDescription } from 'src/app/models/reservationDescription.model';
import { Schedule, WeekDays } from 'src/app/models/schedule.model';
import { BusinessService } from 'src/app/services/business.service';
import { SharedService } from 'src/app/services/shared.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { MS_PER_MINUTE } from '../reservation-times/reservation-times.component';

/**
 * Set localDate from local time to business time
 * @param localDate 
 * @param businessOffset 
 * @param localOffset 
 * @returns 
 */
export function changeDateTimezone(localDate: Date, businessOffset: number, localOffset: number) {
  // Add current timezone offset to take it to UTC 
  localDate.setTime(localDate.getTime() + (localOffset * MS_PER_MINUTE))
  // Substract business offset to take it to his timezone
  localDate.setTime(localDate.getTime() - (businessOffset * MS_PER_MINUTE))
  return localDate.getTime()
}

export function generateTimezone(offset: number): string{
  let _timezone = offset > 0 ? '-' : '+'

  let _offsetHourString = Math.abs(Math.floor(offset / 60)).toString()
  let _offsetMinutesString = (offset % 60).toString()

  _timezone+= _offsetHourString.length < 2 ? '0'.concat(_offsetHourString) : _offsetHourString
  _timezone+= _offsetMinutesString.length < 2 ? '0'.concat(_offsetMinutesString) : _offsetMinutesString
  return  _timezone
}

@Component({
  selector: 'app-reservation-picker-display',
  templateUrl: './reservation-picker-display.component.html',
  styleUrls: ['./reservation-picker-display.component.scss']
})
export class ReservationPickerDisplayComponent implements OnInit {

  @Input() businessName: string
  @Input() schedule: Schedule

  reservations: Reservation[] = []

  timePicked: Date
  correctTimePicked : Date
  reservationDescription = new ReservationDescription()

  datePicked = new FormControl({value:'', disabled:true}, Validators.required);
  dayPicked: Day;
  businessTimezoneFormat: string = ""

  openDays = new Map<WeekDays, Day>()

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  loadingReservations = false
  successFetchReservations = false
  errorReservationsMessage: string = ""
  
  loadingConfirm = false
  successConfirmReservation = true
  confirmStatusMessage = ""

  myFilter: any

  get date() { return this.datePicked.value as Date}

  get start() { return this.range.get('start').value }
  get end() { return this.range.get('end').value }

  constructor(
    private businessService: BusinessService, 
    private userService: UserService,
    private snackbarService: SnackbarService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.updateOpenDays()
    this.setFilter()
    this.businessTimezoneFormat = generateTimezone(this.schedule.offset)
  }

  onTimePicked(time: Date) {
    this.confirmStatusMessage = ""
    this.timePicked = time
    this.correctTimePicked = new Date(time.getTime())
    this.reservationDescription.calculateDescription(this.correctTimePicked)
  }

  updateOpenDays() {
    this.schedule.days.forEach(day => {
      if (day.open) {
        this.openDays.set(day.day, day)
      }
    })
  }

  setFilter() {
    this.myFilter = (d: Date | null): boolean => {
      const now = new Date(Date.now())
      const day = (d || new Date());
      changeDateTimezone(now, this.schedule.offset, now.getTimezoneOffset())
      now.setHours(0,0,0,0)
      const dayNumber = day.getDay();
      return this.openDays.has(WeekDays[dayNumber.toString()]) && day.getTime() >= now.getTime()
    }
  }

  confimrTime() {
    if (!this.sharedService.authenticated) {
      this.snackbarService.error("Login before creating a reservation")
      return
    }

    let _reservation = new Reservation()
    _reservation.reservedAt = this.timePicked
    _reservation.day = this.dayPicked.day
   
    this.loadingConfirm = true
    this.userService.createUserReservation(_reservation, this.businessName).subscribe(
      (reservation: Reservation) => {
        this.reservations.push(reservation)
        // Force ngOnChanges trigger in reservation-time component, (Changes array reference)
        this.reservations = this.reservations.slice(0)
        this.loadingConfirm = false
        this.confirmStatusMessage = "Reservation created"
        this.snackbarService.success("Reservation created")
      },
      (error) => {
        console.log("ERROR create reservation: ", error)
        console.log("ERROR create reservation2: ", JSON.stringify(error))
        this.loadingConfirm = false
        this.confirmStatusMessage = "Error creating reservation"
        this.snackbarService.error("Error creating reservation: " + error.error.message)
      }
    )
  }

  onDateChange($event) {
   
    let start = new Date(this.date)

    // Set start UTC to the business UTC
    // UTC - local offset sets UTC to 00:00
    // Adds the business offset to match the business UTC
    changeDateTimezone(start, start.getTimezoneOffset(), this.schedule.offset)

    // Add 23:59 hs
    let end = new Date(start.getTime() + (24*60*MS_PER_MINUTE) - MS_PER_MINUTE)

    let _weekDay = WeekDays[this.date.getDay().toString()];
    this.dayPicked = this.openDays.get(_weekDay);

    this.fetchReservations(start, end)
    
  }

  fetchReservations(start: Date, end: Date) {
    this.loadingReservations = true
    this.businessService.getUserBusinessReservations(this.businessName, start, end).subscribe(
      (reservations: Reservation[]) => {
        this.loadingReservations = false
        this.successFetchReservations = true
        this.reservations = reservations
      },
      (error) => {
        console.log("ERROR fetchReservations: ", error)
        this.loadingReservations = false
        this.successFetchReservations = false
        this.errorReservationsMessage = "Error loading reservations"
      }
    )
  }

}

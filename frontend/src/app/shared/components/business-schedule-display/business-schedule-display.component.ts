import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { Schedule, WeekDays } from 'src/app/models/schedule.model';
import { generateTimezone } from 'src/app/modules/business/components/reservation-picker-display/reservation-picker-display.component';

@Component({
  selector: 'app-business-schedule-display',
  templateUrl: './business-schedule-display.component.html',
  styleUrls: ['./business-schedule-display.component.scss']
})
export class BusinessScheduleDisplayComponent implements OnInit {

  @Input() schedule: Schedule

  timezoneFormat: string = ""

  constructor() { }

  ngOnInit(): void {
    this.timezoneFormat = generateTimezone(this.schedule.offset)
    this.schedule.days.sort((a:Day, b:Day) => {
      let _a = WeekDays[a.day] as unknown as number
      let _b = WeekDays[b.day] as unknown as number
      return _a - _b
    })
  }

}

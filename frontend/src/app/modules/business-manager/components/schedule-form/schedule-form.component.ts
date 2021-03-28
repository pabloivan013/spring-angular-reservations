import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { WeekDays } from 'src/app/models/schedule.model';

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 5,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds'
  });
}

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class ScheduleFormComponent implements OnInit {

  @Input() form: FormGroup

  WeekDays = WeekDays

  constructor() { }

  ngOnInit(): void {
  }

  get schedule() { return this.form.get('schedule') as FormGroup; }
  //get days() { return this.schedule.get('days') as FormArray }

  getDaysControls(form) {
    return form.controls.days.controls
  }

  getOpTimesControls(form) {
   return  form.controls.operationTimes.controls
  }

}

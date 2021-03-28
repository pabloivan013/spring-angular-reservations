import { Component, Input, OnInit } from '@angular/core';
import { OperationTime } from 'src/app/models/operationTime.model';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  @Input() title: string
  @Input() mytime: Date
  @Input() operation: OperationTime

  constructor() { }

  ngOnInit(): void {
    console.log("timepicker: ", this.operation)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business.model';

@Component({
  selector: 'app-business-display',
  templateUrl: './business-display.component.html',
  styleUrls: ['./business-display.component.scss']
})
export class BusinessDisplayComponent implements OnInit {

  @Input() business: Business[]

  constructor() { }

  ngOnInit(): void {
  }

}

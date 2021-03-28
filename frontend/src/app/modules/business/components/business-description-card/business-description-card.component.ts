import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business.model';

@Component({
  selector: 'app-business-description-card',
  templateUrl: './business-description-card.component.html',
  styleUrls: ['./business-description-card.component.scss']
})
export class BusinessDescriptionCardComponent implements OnInit {

  @Input() business: Business

  constructor() { }

  ngOnInit(): void {
  }

}

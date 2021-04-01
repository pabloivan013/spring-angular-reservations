import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business.model';

@Component({
  selector: 'app-business-info-card',
  templateUrl: './business-info-card.component.html',
  styleUrls: ['./business-info-card.component.scss']
})
export class BusinessInfoCardComponent implements OnInit {

  @Input() business: Business

  constructor() { }

  ngOnInit(): void {
  }

}

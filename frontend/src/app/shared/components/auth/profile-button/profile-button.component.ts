import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit {

  @Input()stroked: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}

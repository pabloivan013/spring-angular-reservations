import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models/user.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  user: User;

  constructor(public auth: AuthService, private shared: SharedService) { }

  ngOnInit(): void {
    this.user = this.shared.getUser();
  }

}

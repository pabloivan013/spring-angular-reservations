import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Business } from 'src/app/models/business.model';
import { Reservation } from 'src/app/models/reservation.model';
import { User } from 'src/app/models/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  authenticated: boolean;
  constructor(
    public auth: AuthService, 
    private shared: SharedService, 
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.user = this.shared.getUser();
    this.getUserBusiness();
    this.getUserReservations();
  }

  getUserBusiness() {
    this.userService.getUserBusiness().subscribe(
      (busines: Business[]) => {
        this.user.business = busines
      },
      (error) => {
        console.log("ERROR getUserBusiness: ", error)
      }
    )
  }

  getUserReservations() {
    this.userService.getUserReservations().subscribe(
      (reservations: Reservation[]) => {
        this.user.reservations = reservations
      },
      (error) => {
        console.log("ERROR getUserReservations: ", error)
      }
    )
  }

}

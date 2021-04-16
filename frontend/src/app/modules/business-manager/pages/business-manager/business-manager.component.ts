import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models';
import { Business } from 'src/app/models/business.model';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-business-manager',
  templateUrl: './business-manager.component.html',
  styleUrls: ['./business-manager.component.scss']
})
export class BusinessManagerComponent implements OnInit {

  user: User;
  authenticated: boolean;
  panelOpenState = false;
  newBusiness: Business;

  loadingBusiness = false

  constructor(
    public auth: AuthService, 
    private sharedService: SharedService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.sharedService.getUser();
    this.getUserBusiness();
  }

  getUserBusiness() {
    this.loadingBusiness = true
    this.userService.getUserBusiness().subscribe(
      (business: Business[]) => {
        this.loadingBusiness = false
        this.user.business = business
      },
      (error) => {
        console.log("ERROR getUserBusiness: ", error)
        this.loadingBusiness = false
      }
    )
  }

}

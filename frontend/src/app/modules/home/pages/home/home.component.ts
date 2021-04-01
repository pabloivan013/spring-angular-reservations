import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Schedule } from 'src/app/models/schedule.model';
import { SharedService } from 'src/app/services/shared.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    private sharedService: SharedService, 
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  schedule = new Schedule();

  ngOnInit(): void {
  }

  createBusiness() {
    if(!this.sharedService.authenticated) {
      this.snackbarService.error("Login or signup before creating a new business")
      return
    }
    this.router.navigate(['/management/business'])
  }

}

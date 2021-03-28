import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { plainToClass, plainToClassFromExist} from 'class-transformer'
import { UserService } from './user.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private authenticatedUserSource = new Subject<boolean>()

  authenticatedUser$ = this.authenticatedUserSource.asObservable()

  authUserAnnounce(auth: boolean) {
    this.authenticatedUserSource.next(auth)
  }
  

  private user: User = new User();
  authenticated = false;

  constructor(private auth: AuthService, private userService: UserService) { 
    this.auth0UserDetails();
    this.auth0UserAuthenticated();
    this.createUpdateAuthUser();
  }

  auth0UserDetails() {
    this.auth.user$.subscribe(
      (user: User) => {
        plainToClassFromExist(this.user, user, {excludeExtraneousValues: true})
        //Object.assign(this.user, user)
      },
      (error) => {
        console.log("ERROR SharedService auth0UserDetails: ", error)
      }
    )
  }

  auth0UserAuthenticated() {
    this.auth.isAuthenticated$.subscribe(
      (auth) => {
        this.authUserAnnounce(auth);
        this.authenticated = auth;
      },
      (error) => console.log('ERROR SharedService auth0UserAuthenticated: ', error)
    );
  }

  createUpdateAuthUser() {
    this.authenticatedUser$.subscribe(
      (auth) => {
        if (auth) 
          this.userService.createUpdateUser(this.user).subscribe(
            (user: User) => {
              this.user.created = true;
            },
            (error) => {
              console.log("ERROR createUpdateAuthUser: ", error)
            }
          )
      }
    )
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Business } from '../models/business.model';
import { Reservation } from '../models/reservation.model';
import { AppSettings } from '../app.settings'
import { map } from "rxjs/operators";
import { plainToClass} from 'class-transformer'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PRIVATE = `${AppSettings.API_ENDPOINT}/private`
  PUBLIC  = `${AppSettings.API_ENDPOINT}/public`

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.PRIVATE}/users`).pipe(
      map(res => plainToClass(User, res))
    )
  }

  createUpdateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.PRIVATE}/users`, user).pipe(
      map(res => plainToClass(User, res))
    )
  }

  getUserBusiness(): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.PRIVATE}/users/business`).pipe(
      map(res => plainToClass(Business, res))
    );
  }

  createUserBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>(`${this.PRIVATE}/users/business`, business).pipe(
      map(res => plainToClass(Business, res))
    )
  }

  getUserBusinessReservations(business?: string, start?: Date, end?: Date): Observable<Reservation[]> {
    let startParameter = `start=${start ? start.toISOString() : ''}`
    let endParameter   = `end=${end ? end.toISOString() : ''}`
    let url = `${this.PRIVATE}/users/business/reservations?business=${business}&${startParameter}&${endParameter}`
    return this.http.get<Reservation[]>(url).pipe(
      map(res => plainToClass(Reservation, res))
    )
  }

  //POST /users/reservations?business=<business-name>

  getUserReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.PRIVATE}/users/reservations`).pipe(
      map(res => plainToClass(Reservation, res))
    )
  }

  //http://localhost:3010/api/private/users/reservations?business=test123456
  createUserReservation(reservation: Reservation, businessName: string) {
    return this.http.post<Reservation>(
      `${this.PRIVATE}/users/reservations?business=${businessName}`, 
        reservation
      ).pipe(map(res => plainToClass(Reservation, res)))
  }

}
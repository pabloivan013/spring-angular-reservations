import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app.settings';
import { Reservation } from '../models';
import { Business } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  PUBLIC  = `${AppSettings.API_ENDPOINT}/public`

  constructor(private http: HttpClient) { }

  getBusiness(name: string): Observable<Business> {
    return this.http.get<Business>(`${this.PUBLIC}/business/${name}`).pipe(
      map( res => plainToClass(Business, res))
    )
  }

  getBusinessContaining(name: string): Observable<Business[]>  {
    return this.http.get<Business[]>(`${this.PUBLIC}/business?name=${name}`).pipe(
      map(res => plainToClass(Business, res))
    )
  }

  getUserBusinessReservations(name: string, start?: Date, end?: Date): Observable<Reservation[]> {
    let startParameter = `start=${start ? start.toISOString() : ''}`
    let endParameter   = `end=${end ? end.toISOString() : ''}`
    let url = `${this.PUBLIC}/business/${name}/reservations?${startParameter}&${endParameter}`
    return this.http.get<Reservation[]>(url).pipe(
      map(res => plainToClass(Reservation, res))
    )
  }


}

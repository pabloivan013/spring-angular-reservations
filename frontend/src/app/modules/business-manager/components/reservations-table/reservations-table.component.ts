import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Reservation } from 'src/app/models';
import { Business } from 'src/app/models/business.model';
import { UserService } from 'src/app/services/user.service';
import { ReservationDescriptionComponent } from '../reservation-description/reservation-description.component';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./reservations-table.component.scss']
})
export class ReservationsTableComponent implements OnInit {

  @Input() businessName: string = ''

  columnsToDisplay: string[] = ['reservedAt', 'email', 'createdAt'];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>()

  expandedElement: Reservation | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(ReservationDescriptionComponent) reservationDescription: QueryList<ReservationDescriptionComponent>

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = []
  }

  updateDescriptionChilds() {
    this.reservationDescription.forEach(c => c.calculateReservationDescription())
  }

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl()
  });

  get start() {return this.range.get('start').value}
  get end() {return this.range.get('end').value}

  constructor(
    private userService: UserService, 
    private readonly adapter: DateAdapter<Date>
    ) { }

  ngOnInit(): void {
    this.adapter.setLocale(navigator.language)
    if (!this.businessName.length)
      this.columnsToDisplay.push("business")
  }

  fetchReservations() {
    this.userService.getUserBusinessReservations(this.businessName, this.start, this.end).subscribe(
      (reservations: Reservation[]) => {
        this.dataSource.data = reservations
      },
      (error) => {
        console.log("ERROR fetchAllReservations: ", error)
      }
    )
  }

}

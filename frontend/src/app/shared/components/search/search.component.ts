import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Business } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  control = new FormControl('')
  businessMatch: Business[] = []
  timeout: any

  constructor(
    private router: Router,
    private businessService: BusinessService
    ) { }

  ngOnInit(): void {
    this.control.valueChanges.pipe(filter((val:string)=> val && val.length > 0)).subscribe(
      (value) => {
        this.timeOutCallback(() => this.fetchBusinessContainingValue())
      }
    )
  }

  timeOutCallback(callback: any) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(callback, 500)
  }

  fetchBusinessContainingValue() {
    this.businessService.getBusinessContaining(this.control.value).subscribe({
      next: (business: Business[]) => {
        this.businessMatch = business
      },
      error: (error) => {
        console.log("ERROR fetchBusinessContainingValue: ", error)
      }
    })
  }

  gotoBusiness(value?: any) {
    let name: string = value ? value : this.control.value
    if (name && name.length > 0)
      this.router.navigate(['/business', name])
  }

}

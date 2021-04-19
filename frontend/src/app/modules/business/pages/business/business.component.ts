import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Business } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  name: string;
  business: Business

  loadingBusiness: boolean = false
  errorMessage: string

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService
    ) { 
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.name = params.get('name')
        this.getBusiness()
      })
    }

  ngOnInit(): void {
  }

  getBusiness() {
    this.loadingBusiness = true
    this.business = null

    this.businessService.getBusiness(this.name).subscribe({
      next: (business: Business) => {
        this.business = business
        this.loadingBusiness = false
      },
      error: (error) => {
        console.log("ERROR getBusiness: ", error)
        this.errorMessage = "Error loading business"
        this.loadingBusiness = false
        if (error.status == 404)
          this.errorMessage = `Business ${this.name} not found`
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.getBusiness()
  }

  getBusiness() {
    this.loadingBusiness = true

    this.businessService.getBusiness(this.name).subscribe(
      (business: Business) => {
        console.log("Business: ", business)
        this.business = business
        this.loadingBusiness = false
      },
      (error) => {
        console.log("ERROR getBusiness: ", error)
        this.errorMessage = "Error loading business"
        this.loadingBusiness = false
        if (error.error.status = 404)
          this.errorMessage = error.error.message
      }
    )
  }

}

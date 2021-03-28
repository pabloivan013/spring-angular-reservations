import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, AbstractControl, FormGroupDirective, NgForm, FormGroup, ValidationErrors, ValidatorFn, Form } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { plainToClass } from 'class-transformer';
import { User } from 'src/app/models';
import { Business } from 'src/app/models/business.model';
import { Day } from 'src/app/models/day.model';
import { OperationTime } from 'src/app/models/operationTime.model';
import { Schedule, WeekDays } from 'src/app/models/schedule.model';
import { SharedService } from 'src/app/services/shared.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-business-expansion-panel',
  templateUrl: './business-expansion-panel.component.html',
  styleUrls: ['./business-expansion-panel.component.scss']
})
export class BusinessExpansionPanelComponent implements OnInit {

  user: User;
  business = new Business()
  _schedule = new Schedule()
  WeekDays = WeekDays

  loadingBar: boolean = false
  openExpansionPanel: boolean = false

  businessForm: FormGroup
  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private sharedService: SharedService,
    private snackbarService: SnackbarService,
    private cdRef:ChangeDetectorRef
    ) {}

    ngAfterViewChecked(){
      this.cdRef.detectChanges();
    }

  ngOnInit(): void {
    this.user = this.sharedService.getUser()
    this.initBusinessForm(this.business)
  }
  
  initBusinessForm(business: Business) {
    this.businessForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(60)]],
      address: [''],
      location: [''],
      description: [''],
      schedule: this.fb.group({
        days: this.initDaysForm(business.schedule.days)
      })
    })
  }

  initDaysForm(days: Day[]): FormArray {
    return this.fb.array( days.map(d => this.fb.group({
            day: [d.day],
            open: [d.open],
            operationTimes: this.initOperationTimeForm(d.operationTimes)
          }, {validators: this.dayValidator})))
  }

  dayValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const open = control.get('open').value;
    const operationTimes = control.get('operationTimes') as FormArray
    
    operationTimes.controls.forEach((c: FormGroup, index) => {
      c.setErrors(null);
      if (!open)
        return
      
      let start: Date = new Date(c.value.start)
      let end: Date = new Date(c.value.end)
      let interval: Date = new Date(c.value.interval)

      if (start >= end)
        return c.setErrors({startBiggerThanEnd: true})
        
      let diff = Math.round(Math.abs((start.getTime() - end.getTime()) / 60000))
      let intervalMinutes = (interval.getHours() * 60) + interval.getMinutes()
      let totalReservations = Math.floor(diff/intervalMinutes)
      
      c.patchValue({'totalReservations':totalReservations}, {onlySelf:true})
      c.patchValue({'intervalTime':intervalMinutes}, {onlySelf:true})

      if (intervalMinutes <= 0 || intervalMinutes > diff)
        return c.setErrors({invalidIntervalTime: true})
        
    })
    
    return null
  };

  initOperationTimeForm(opTimes: OperationTime[]): FormArray {
    return this.fb.array(opTimes.map( op => 
              this.fb.group({
                start: [op.start],
                end: [op.end],
                intervalTime: [op.intervalTime],
                interval: [op.interval],
                totalReservations:[0]
              })  
            ))
  }

  get name() { return this.businessForm.get('name'); }
  get address() { return this.businessForm.get('address'); }
  get location() { return this.businessForm.get('location'); }
  get description() { return this.businessForm.get('description'); }
  get schedule() { return this.businessForm.get('schedule') as FormGroup; }
  get days() { return this.schedule.get('days') as FormArray }

  resetForm() {
    this.businessForm.reset()
    this.initBusinessForm(this.business)
  }

  updateValueAndValidityForm(form: AbstractControl) {

    if (form instanceof FormGroup) {
      Object.values(form.controls).forEach(c => this.updateValueAndValidityForm(c))
    }

    if (form instanceof FormArray) {
      (form as FormArray).controls.forEach(c => this.updateValueAndValidityForm(c))
    }

    form.updateValueAndValidity()

  }


  onSubmit() {
    console.warn(this.businessForm.value);
    this.updateValueAndValidityForm(this.businessForm)
    
    if (!this.businessForm.valid) {
      console.log("Business form not valid")
      return
    }

    this.loadingBar = true
    let _business = plainToClass(Business, this.businessForm.value)
 
    _business.schedule.offset = new Date().getTimezoneOffset()
    console.log("SUBMIT BUSINESS: ", _business)
    
    this.userService.createUserBusiness(_business).subscribe(
      (business: Business) => {
        console.log("Business created: ", business)
        this.user.business.unshift(business)
        this.loadingBar = false
        this.resetForm()
        this.openExpansionPanel=false
        this.snackbarService.success("Business created")
      },
      (error) => {
        console.log("ERROR business creation: ", error)
        this.loadingBar = false
        this.snackbarService.error(`Error creating business: ${error.error.message}`)
      }
    )
  }

}

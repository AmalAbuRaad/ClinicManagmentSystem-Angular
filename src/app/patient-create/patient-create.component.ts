import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Country } from '../models/country';
import { Patient } from '../models/patient';
import { CountriesService } from '../services/countries.service';
import { PatientsService } from '../services/patients.services';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {

  createForm:FormGroup;
  countries: Country[];

  constructor(private patientService: PatientsService,private router:Router,private route: ActivatedRoute
    ,private countryService: CountriesService ) { }

  ngOnInit(): void {

    this.route.params.subscribe((_params: Params) => {
      this.countries = this.countryService.countries;
    })

    this.createForm = new FormGroup({
      fullName: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
      }),      
      age: new FormControl(),    
      email: new FormControl(null, [Validators.required, Validators.email,this.restrictedEmails]),
      gender: new FormControl('Male'),
      phoneNumber: new FormControl(),
      address: new FormControl(),
      ssn: new FormControl(),
      country: new FormControl()
    })

  }

  onSubmit(){
    if(!this.createForm.valid)
      return;

    let patient = new Patient(this.createForm.value.fullName.firstName, this.createForm.value.fullName.lastName,  this.createForm.value.age);

    patient.email = this.createForm.value.email;
    patient.gender = this.createForm.value.gender;
    patient.phoneNumber = this.createForm.value.phoneNumber;
    patient.address = this.createForm.value.address;
    patient.ssn = this.createForm.value.ssn;
    patient.country = this.createForm.value.country;

    this.patientService.addPatient(patient);

    this.createForm.reset();
    this.reloadComponent();
  }

  restrictedEmails(control:FormControl){ 
    let emails = ['test@test.com', 'aa@aa.com']
      if(emails.indexOf(control.value) > -1){
        return {restrictedEmail: true}
      }
  
      return null;      
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/patients/create']);
}

}

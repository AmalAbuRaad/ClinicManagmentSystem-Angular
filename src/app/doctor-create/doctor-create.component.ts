import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Country } from '../models/country';
import { Doctor } from '../models/doctor';
import { Specialization } from '../models/specialization';
import { CountriesService } from '../services/countries.service';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationsService } from '../services/specializations.service';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.css']
})
export class DoctorCreateComponent implements OnInit {

  createForm:FormGroup;
  specializations:Specialization[];
  countries:Country[];
  

  constructor(private route: ActivatedRoute, private doctorService: DoctorsService
    ,private countryService: CountriesService, private specializationService: SpecializationsService) { }

  ngOnInit(): void {

    this.route.params.subscribe((_params:Params)=>{
      this.specializations = this.specializationService.specializations;})
  
    this.route.params.subscribe((_params: Params) => {
      this.countries = this.countryService.countries;
    })
    this.createForm = new FormGroup({
      fullName: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
      }),      
      monthlySalary: new FormControl(),    
      email: new FormControl(null, [Validators.required, Validators.email,this.restrictedEmails]),
      country: new FormControl('Palestine'),
      appointments: new FormControl(),
      specializationId: new FormControl(),
      specialization: new FormControl(),
      address: new FormControl(),
      notes: new FormControl(),
      phoneNumber: new FormControl(),
      iban: new FormControl()
    })
  }

  onSubmit(){
    if(!this.createForm.valid)
      return;

    let doctor = new Doctor(this.createForm.value.fullName.firstName, this.createForm.value.fullName.lastName,  this.createForm.value.monthlySalary);

    doctor.email = this.createForm.value.email;
    doctor.country = this.createForm.value.country;
    doctor.appointments = this.createForm.value.appointments;
    doctor.specializationId = this.createForm.value.specializationId;
    doctor.specialization = this.createForm.value.specialization;
    doctor.address = this.createForm.value.address;
    doctor.notes = this.createForm.value.notes;
    doctor.phoneNumber = this.createForm.value.phoneNumber;
    doctor.iban = this.createForm.value.iban;

    this.doctorService.addDoctor(doctor);

    this.createForm.reset();
  }

  restrictedEmails(control:FormControl){ 
    let emails = ['test@test.com', 'aa@aa.com']
      if(emails.indexOf(control.value) > -1){
        return {restrictedEmail: true}
      }
  
      return null;      
  }


}

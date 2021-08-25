import { NgModule } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Country } from '../models/country';
import { Doctor } from '../models/doctor';
import { Specialization } from '../models/specialization';
import { CountriesService } from '../services/countries.service';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationsService } from '../services/specializations.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctor: Doctor;
  specializations: Specialization[];
  @ViewChild('editForm')
  editForm: NgForm;
  specializationId: NgModel;
  countries: Country[];
  specialization:Specialization;

  constructor(private route: ActivatedRoute, private doctorService: DoctorsService
    ,private countryService: CountriesService, private specializationService: SpecializationsService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.doctor = this.doctorService.doctors.find(d => d.id == +params['id']) as Doctor
    })
    this.route.params.subscribe((params:Params)=>{
      this.specializations = this.specializationService.specializations;})
  
    this.route.params.subscribe((_params: Params) => {
      this.countries = this.countryService.countries;
    })
  }

  onSubmit(editForm: NgForm) {

    var form = editForm.value;
    
    this.route.params.subscribe((_params:Params)=>{
      this.specialization = this.specializationService.specializations.find(s=>s.specializationName==form.specialization.specializationName)as Specialization;})
      form.specialization=this.specialization;
      form.specializationId=this.specialization.id;
    
    if (!editForm.valid)
      return;

    this.doctorService.updateDoctor(editForm.value)

    this.editForm.reset()

    this.editForm.form.patchValue({
      country: 'Palestine, State of'
    })
  }

}

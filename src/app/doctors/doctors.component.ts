import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { Specialization } from '../models/specialization';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationsService } from '../services/specializations.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];
  specializations: Specialization[];
  isLoading = false;
  error: string;


  constructor(private router: Router, private doctorService: DoctorsService,
    private specializationService: SpecializationsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.specializationService.getSpecializations()
      .subscribe(response => {
        this.specializations = response;
      },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        });;

    this.doctorService.getDoctors()
      .subscribe(response => {
        this.isLoading = false;
        this.doctors = response;
      },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        });;
    
  }

  onAddDoctor() {
    this.router.navigate(['/doctors/create'])
  }


}

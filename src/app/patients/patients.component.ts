import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { LoggingService } from '../services/logging.service';
import { PatientsService } from '../services/patients.services';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Patient[];
  isLoading = false;
  error: string;


  constructor(private router: Router, private patientService: PatientsService) {


  }

  ngOnInit(): void {
    this.isLoading = true;

    this.patientService.getPatients()
      .subscribe(response => {
        this.isLoading = false;
        this.patients = response;
      },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        });;
  }


  addPatient(data: Patient) {
    this.patientService.addPatient(data);
  }

  onAddPatient() {
    this.router.navigate(['/patients/create'])
  }

  onClearPatients() {
    this.patientService.clearPatients();
  }

  onSearchPatient(name: string) {
    
    this.patientService.getPatient(name);
  }
}

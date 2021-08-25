import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription, } from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { AppointmentsService } from '../services/appointments.service';
import { DoctorsService } from '../services/doctors.service';
import { PatientsService } from '../services/patients.services';

const ELEMENT_DATA: Appointment[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appointment: Appointment;
  displayedColumns: string[] = ['doctorName','patientName', 'reservation'];
  dataSource = ELEMENT_DATA;
  patient: Patient;
  doctor: Doctor;

  constructor(private route:ActivatedRoute, private appointmentService:AppointmentsService,
    private patientService:PatientsService, private doctorService:DoctorsService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((params:Params)=>{
      this.dataSource = this.appointmentService.appointments;})

      for(let i=0; i<this.dataSource.length; i++){
        this.route.params.subscribe((params:Params)=>{
          this.appointment = this.appointmentService.appointments.find(a=>a.id==this.dataSource[i].id)as Appointment;})

        this.route.params.subscribe((params:Params)=>{
          this.patient = this.patientService.patients.find(a=>a.id==this.appointment.patientId)as Patient;})
          this.appointment.patient=this.patient;
          
        this.route.params.subscribe((params:Params)=>{
          this.doctor = this.doctorService.doctors.find(d=>d.id==this.appointment.doctorId)as Doctor;})
          this.appointment.doctor=this.doctor;

        console.log(this.dataSource[i]);
        console.log(this.appointment.patient.fullName);
      }
  
  
  }

  
}


import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { Specialization } from '../models/specialization';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationsService } from '../services/specializations.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctor:Doctor;
  specialization: Specialization;

  constructor(private router:Router, private doctorService:DoctorsService, private specializationService:SpecializationsService,
    private route:ActivatedRoute) {
    this.doctor = new Doctor('','',0)
    this.specialization = new Specialization(0,'');
   }

  ngOnInit(): void {
       let allowEdit = this.route.snapshot.queryParams['allowEdit'];

      this.route.params.subscribe((params:Params)=>{
        this.doctor = this.doctorService.doctors.find(d => d.id == +params['id'] ) as Doctor;
        console.log(this.doctor);
      })
      
      this.route.params.subscribe((params:Params)=>{
        this.specialization = this.specializationService.specializations.find(s => s.id == this.doctor.specializationId ) as Specialization;
        console.log(this.specialization);
      })
    
  }

  onEdit(id:number){
    this.router.navigate(['/doctors', id, 'edit' ], {queryParams: {allowEdit: true}});
  }
  onDeleteDoctor(id: number){
    this.doctorService.deleteDoctor(id);

  }

}

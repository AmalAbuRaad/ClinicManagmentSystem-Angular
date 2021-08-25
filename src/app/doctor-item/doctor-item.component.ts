import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoctorEditComponent } from '../doctor-edit/doctor-edit.component';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.css']
})
export class DoctorItemComponent implements OnInit {

  @Input('doctorItem')
    doctor: Doctor; 

  constructor(public dialog: MatDialog, private doctorService: DoctorsService,private router: Router) {
    this.doctor = new Doctor('', '',0);
    
   }

  ngOnInit(): void {
    
  }

  onCardClick(id:number){
    this.router.navigate(['/doctors/', id]) 
  }

  onEdit(id: number){
    this.router.navigate(['/doctors', id, 'edit' ], {queryParams: {allowEdit: true}});
  }

}

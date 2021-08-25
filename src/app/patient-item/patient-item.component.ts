import { OnChanges } from '@angular/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';
import { PatientsService } from '../services/patients.services';


@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css']
})
export class PatientItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input('patientItem')
    patient: Patient; 

  constructor(public dialog: MatDialog, private patientService: PatientsService,private router: Router) {
    this.patient = new Patient('', '',0);
    
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){

  }

  ngOnChanges(){

  }
  onCardClick(id:number){
    this.router.navigate(['/patients/', id]) 
  }

  onEdit(id: number){
    this.router.navigate(['/patients', id, 'edit' ], {queryParams: {allowEdit: true}});
  }
  openDialog() {
    this.dialog.open(PatientEditComponent);
  }

  
}

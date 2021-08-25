import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.services';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patient:Patient;

  constructor(private router:Router, private patientService:PatientsService, private route:ActivatedRoute) {
    this.patient = new Patient('','',0)
   }

  ngOnInit(): void {
       let allowEdit = this.route.snapshot.queryParams['allowEdit'];

      this.route.params.subscribe((params:Params)=>{
        this.patient = this.patientService.patients.find(p => p.id == +params['id'] ) as Patient;
      })
      
    
  }

  onEdit(id:number){
    this.router.navigate(['/patients', id, 'edit' ], {queryParams: {allowEdit: true}});
  }
  onDeletePatient(id: number){
    this.patientService.deletePatient(id);
    this.reloadComponent();

  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/patients']);
}

}

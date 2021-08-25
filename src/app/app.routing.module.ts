import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DoctorCreateComponent } from "./doctor-create/doctor-create.component";
import { DoctorDetailComponent } from "./doctor-detail/doctor-detail.component";
import { DoctorEditComponent } from "./doctor-edit/doctor-edit.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { HomeComponent } from "./home/home.component";
import { PatientCreateComponent } from "./patient-create/patient-create.component";
import { PatientDetailComponent } from "./patient-detail/patient-detail.component";
import { PatientEditComponent } from "./patient-edit/patient-edit.component";
import { PatientsComponent } from "./patients/patients.component";


const appRoutes:Route[] = [
   {path:'', component: HomeComponent},
   {path:'patients', component: PatientsComponent, children: 
   [
    
    {path:'create', component: PatientCreateComponent}, 
     {path:':id', component: PatientDetailComponent},
     {path:':id/edit', component: PatientEditComponent},
     
   ]
   },  
   {path:'doctors', component: DoctorsComponent, children: 
   [
    
    {path:'create', component: DoctorCreateComponent}, 
     {path:':id', component: DoctorDetailComponent},
     {path:':id/edit', component: DoctorEditComponent},
     
   ]},
   {path:'**', redirectTo : ''}
 ];

@NgModule(
   {
    imports:[
      RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
   }
)
export class   AppRoutingModule{

}
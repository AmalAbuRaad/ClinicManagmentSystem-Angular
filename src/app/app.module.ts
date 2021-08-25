import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientItemComponent } from './patient-item/patient-item.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientsHeaderComponent } from './patients-header/patients-header.component';
import { HighlightDirective } from './directives/highlight.directive';
import { AppHiddenDirective } from './directives/app-hidden.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { HomeComponent } from './home/home.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { AppRoutingModule } from './app.routing.module';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorCreateComponent } from './doctor-create/doctor-create.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorItemComponent } from './doctor-item/doctor-item.component';
import { DoctorsHeaderComponent } from './doctors-header/doctors-header.component';





@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PatientsComponent,
    PatientItemComponent,
    PatientsHeaderComponent,
    HighlightDirective,
    AppHiddenDirective,
    ShortenPipe,
    HomeComponent,
    PatientDetailComponent,
    PatientEditComponent,
    PatientCreateComponent,
    DoctorsComponent,
    DoctorCreateComponent,
    DoctorDetailComponent,
    DoctorEditComponent,
    DoctorItemComponent,
    DoctorsHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
    //RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }

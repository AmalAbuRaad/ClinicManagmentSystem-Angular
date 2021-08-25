import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Country } from '../models/country';
import { Patient } from '../models/patient';
import { CountriesService } from '../services/countries.service';
import { PatientsService } from '../services/patients.services';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  patient: Patient;
  countries: Country[];

  @ViewChild('editForm')
  editForm: NgForm;

  genders = ["Male", "Female"]
  constructor(private route: ActivatedRoute, private patientService: PatientsService,
    private router:Router, private countryService: CountriesService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.patient = this.patientService.patients.find(p => p.id == +params['id']) as Patient
    })

    this.route.params.subscribe((_params: Params) => {
      this.countries = this.countryService.countries;
    })
  }

  onSubmit(editForm: NgForm) {

    if (!editForm.valid)
      return;

    this.patientService.updatePatient(editForm.value)

    this.editForm.reset()
    this.editForm.form.patchValue({
      gender: 'Male'
    })
    this.reloadComponent();
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/patients', this.patient.id, 'edit']);
}
}

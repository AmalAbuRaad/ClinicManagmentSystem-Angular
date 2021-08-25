import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-patients-header',
  templateUrl: './patients-header.component.html',
  styleUrls: ['./patients-header.component.css']
})
export class PatientsHeaderComponent implements OnInit {

  @Output()
  patientsAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  
  addPatient(firstName:HTMLInputElement, lastName:HTMLInputElement, age:HTMLInputElement){
    this.patientsAdded.emit(new Patient(firstName.value, lastName.value, +age.value));
    //console.log(`Patient was added`);
  //  this.firstName = '';

  //  // console.log(data.value);
  //  // console.log(this.fName);

  //  this.patients.push(new Patient(firstName.value, lastName.value, +age.value))
 }
}

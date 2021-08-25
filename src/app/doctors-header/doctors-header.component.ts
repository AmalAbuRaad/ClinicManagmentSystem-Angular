import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctors-header',
  templateUrl: './doctors-header.component.html',
  styleUrls: ['./doctors-header.component.css']
})
export class DoctorsHeaderComponent implements OnInit {

  @Output()
  doctorsAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  
  addDoctor(firstName:HTMLInputElement, lastName:HTMLInputElement, monthlySalary:HTMLInputElement){
    this.doctorsAdded.emit(new Doctor(firstName.value, lastName.value, +monthlySalary.value));
 }

}

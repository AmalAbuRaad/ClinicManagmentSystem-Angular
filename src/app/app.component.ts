import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from './models/appointment';
import { Country } from './models/country';
import { AppointmentsService } from './services/appointments.service';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularTraining'

  appointments: Appointment[];
  error: string;
  countries: Country[];


  constructor( private appointmentService: AppointmentsService, private countryService: CountriesService) {
  }

  ngOnInit(): void {

    this.appointmentService.getAppointments()
      .subscribe(response => {
        this.appointments = response;
      },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        });;

    this.countryService.getCountries()
      .subscribe(response => {
        this.countries = response;
      },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        });;
  }
}

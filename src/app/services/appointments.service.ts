import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointmentAdded = new Subject<Appointment>();

    public appointments: Appointment[] = [];

    constructor(private logService:LoggingService, private httpClient:HttpClient){

    }

    addAppointment(data:Appointment){
        this.httpClient.post(`${environment.WebApiUrl}/Appointments`, data).subscribe(result=>{
            console.log(result);
        });
        
        this.appointments.push(data);
        this.logService.logInfo('Appointments was Added');
        this.appointmentAdded.next(data);
    }

    getAppointments(){
        return this.httpClient.get(`${environment.WebApiUrl}/Appointments`)
        .pipe(
            map((response:{[key:string]: any})=>{
           
                let result:Appointment[] = [];

            for(let key in response){
                if(response.hasOwnProperty(key))
                    {
                        let appointment = new Appointment(0,0,'');
                        Object.assign(appointment,response[key]);
                        appointment.key = key;
                        result.push(appointment);
                    }
            }
            this.appointments = result;
            return result;
        }),
        tap(response =>{
            console.log('Tap Operator');
                console.log(response);
        }))

        //return this.patients;
    }

    getAppointment(key: string) {

        return this.httpClient.get<any>(`${environment.WebApiUrl}/Appointments/${ key }.json`)
          .subscribe(response =>{
            console.log(response);
        })
    
      } 

    

    updateAppointment(appointment:Appointment){
        let obj :{[key:string]: any} = {};
        console.log(appointment);

        obj[appointment.key] = appointment;
        console.log(obj);
        this.httpClient.put(`${environment.WebApiUrl}/Appointments`, obj).subscribe(response =>{
            console.log(response);
        })
    }

    clearAppointments(){
        this.httpClient.delete(`${environment.WebApiUrl}/Appointments`).subscribe(s => {
            this.appointments = [];
        });
    }

    deleteAppointment(id: number){
        this.httpClient.delete(`${environment.WebApiUrl}/Appointments/${id}`).subscribe(response =>{
            console.log(response);
        })
    }

}

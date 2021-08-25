import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';
import { AppointmentType } from '../models/appointmentType';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypesService {
  public appointmentTypes: AppointmentType[] = [];

  constructor(private httpClient:HttpClient) { }

  getTypes(){
    return this.httpClient.get(`${environment.WebApiUrl}/AppointmentTypes`)
    .pipe(
        map((response:{[key:string]: any})=>{
       
            let result:AppointmentType[] = [];

        for(let key in response){
            if(response.hasOwnProperty(key))
                {
                    let appointmentType = new AppointmentType('');
                    Object.assign(appointmentType,response[key]);
                    appointmentType.key = key;
                    result.push(appointmentType);
                }
        }
        this.appointmentTypes = result;
        return result;
    }),
    tap(response =>{
        console.log('Tap Operator');
            console.log(response);
    }))

}
}

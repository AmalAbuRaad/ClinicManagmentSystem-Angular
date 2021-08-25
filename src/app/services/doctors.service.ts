import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { DoCheck, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Doctor } from "../models/doctor";
import { LoggingService } from "./logging.service";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { Specialization } from "../models/specialization";


@Injectable({
    providedIn:'root'
})
export class DoctorsService{

    doctorAdded = new Subject<Doctor>();

    public doctors: Doctor[] = [];
   

    constructor(private logService:LoggingService, private httpClient:HttpClient){

    }

    addDoctor(data:Doctor){
        this.httpClient.post(`${environment.WebApiUrl}/Doctors`, data).subscribe(result=>{
            console.log(result);
        });
        
        this.doctors.push(data);
        this.logService.logInfo('Doctors was Added');
        this.doctorAdded.next(data);
    }

    getDoctors(){
        return this.httpClient.get(`${environment.WebApiUrl}/Doctors`)
        .pipe(
            map((response:{[key:string]: any})=>{
           
                let result:Doctor[] = [];

            for(let key in response){
                if(response.hasOwnProperty(key))
                    {
                        let doctor = new Doctor('','',0);
                        Object.assign(doctor,response[key]);
                        doctor.key = key;
                        result.push(doctor);
                    }
            }
            this.doctors = result;
            return result;
        }),
        tap(response =>{
            console.log('Tap Operator');
                console.log(response);
        }))

        //return this.patients;
    }

    

    getDoctor(key: string) {

        return this.httpClient.get<any>(`${environment.WebApiUrl}/doctors/${ key }.json`)
          .subscribe(response =>{
            console.log(response);
        })
    
      } 

    

      updateDoctor(doctor:Doctor){

        this.httpClient.put(`${environment.WebApiUrl}/Doctors/${ doctor.id }`, doctor).subscribe(response =>{
            console.log(response);
        })
    }
    clearDoctors(){
        this.httpClient.delete(`${environment.WebApiUrl}/Doctors`).subscribe(s => {
            this.doctors = [];
        });
    }

    deleteDoctor(id: number){
        this.httpClient.delete(`${environment.WebApiUrl}/Doctors/${id}`).subscribe(response =>{
            console.log(response);
        })
    }

}
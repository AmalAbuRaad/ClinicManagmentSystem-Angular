import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Patient } from "../models/patient";
import { LoggingService } from "./logging.service";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { Specialization } from "../models/specialization";


@Injectable({
    providedIn:'root'
})
export class PatientsService{

    patientAdded = new Subject<Patient>();

    public patients: Patient[] = [];
   

    constructor(private logService:LoggingService, private httpClient:HttpClient){

    }

    addPatient(data:Patient){
        this.httpClient.post(`${environment.WebApiUrl}/Patients`, data).subscribe(result=>{
            console.log('add'+result);
        });
        
        this.patients.push(data);
        this.logService.logInfo('Patients was Added');
        this.patientAdded.next(data);
    }

    getPatients(){
        return this.httpClient.get(`${environment.WebApiUrl}/Patients`)
        .pipe(
            map((response:{[key:string]: any})=>{
           
                let result:Patient[] = [];

            for(let key in response){
                if(response.hasOwnProperty(key))
                    {
                        let patient = new Patient('','',0);
                        Object.assign(patient,response[key]);
                        patient.key = key;
                        result.push(patient);
                    }
            }
            this.patients = result;
            return result;
        }),
        tap(response =>{
            console.log('Tap Operator');
                console.log(response);
        }))

        //return this.patients;
    }

    

    getPatient(key: string) {

        return this.httpClient.get<any>(`${environment.WebApiUrl}/patients/${ key }.json`)
          .subscribe(response =>{
            console.log(response);
        })
    
      } 

    

    updatePatient(patient:Patient){

        this.httpClient.put(`${environment.WebApiUrl}/Patients/${ patient.id }`, patient).subscribe(response =>{
            console.log(response);
        })
    }

    clearPatients(){
        this.httpClient.delete(`${environment.WebApiUrl}/Patients`).subscribe(s => {
            this.patients = [];
        });
    }

    deletePatient(id: number){
        this.httpClient.delete(`${environment.WebApiUrl}/Patients/${id}`).subscribe(response =>{
            console.log(response);
        })
    }

}
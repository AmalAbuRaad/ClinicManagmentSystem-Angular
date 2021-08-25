import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Specialization } from '../models/specialization';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {
  public specializations: Specialization[]=[];

  constructor(private logService:LoggingService, private httpClient:HttpClient) { }
  getSpecializations(){
    return this.httpClient.get(`${environment.WebApiUrl}/Specializations`)
    .pipe(
        map((response:{[key:string]: any})=>{
       
            let result:Specialization[] = [];

        for(let key in response){
            if(response.hasOwnProperty(key))
                {
                    let specialization = new Specialization(0,'');
                    Object.assign(specialization,response[key]);
                    specialization.key = key;
                    result.push(specialization);
                }
        }
        this.specializations = result;
        return result;
    }),
    tap(response =>{
        console.log('Tap Operator');
            console.log(response);
    }))

    //return this.patients;
}
}

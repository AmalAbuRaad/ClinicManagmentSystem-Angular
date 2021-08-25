import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public countries: Country[] = [];

  constructor(private httpClient:HttpClient) { }

  getCountries(){
    return this.httpClient.get(`${environment.CountryApiUrl}`)
    .pipe(
        map((response:{[key:string]: any})=>{
       
            let result:Country[] = [];

        for(let key in response){
            if(response.hasOwnProperty(key))
                {
                    let country = new Country('');
                    Object.assign(country,response[key]);
                    country.key = key;
                    result.push(country);
                }
        }
        this.countries = result;
        return result;
    }),
    tap(response =>{
        console.log('Tap Operator');
            console.log(response);
    }))

}
}

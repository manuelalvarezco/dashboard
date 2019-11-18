import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SdcService {

  getQuery(query:string, body:string){
    const url=`https://www.smartdatacontact.com/datacall/api/${query}`;

    const headers = new HttpHeaders({
      'Content-type': 'application/json',      
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    })

    return this.http.post(url, body, {headers});
  }

  constructor(private http:HttpClient) { }

  getKpi(forma){

  let body = JSON.stringify(forma);

   
    return this.getQuery('api_sdc/info_kpi',body)
      
  }

  getLlamadas(forma){

  let body = JSON.stringify(forma);

    return this.getQuery('api_sdc/dashboard',body)
  }
}

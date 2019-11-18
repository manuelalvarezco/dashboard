import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdwordsService {

  

  // método padre
  getQuery(params:string, body:string){
  
    // const url = `https://api-adwords-funnel.herokuapp.com/adwordsApi${params}` //producción
    
     const url = `http://localhost:8001/api${params}` //Desarrollo
    
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
  
    // retorna la concatenación de los parámetros
    return this.http.post(url,body,{headers});
  
   }


  constructor(private http:HttpClient) { }


  // información de la cuenta
  getInfoAccount(forma){

    // parsear la forma(fechas) que se recibe
    const body = JSON.stringify(forma);

    // petición a la Api utilizando el método padre getQuery()
    return this.getQuery('/account',body)
      .pipe(
        map( (resp:any)=>{
          resp = resp['@attributes']
          return resp
        } )
      )
    

  }

  getAccountReport(forma){

    let body = JSON.stringify(forma);

    return this.getQuery('/accountReport',forma)
  }
  
  
  // información de la cuenta a nivel de campaña
  getInfoCampaign(forma){

    // parsear la forma(fechas) que se recibe
    const body = JSON.stringify(forma);

    // petición a la Api utilizando el método padre getQuery()
    return this.getQuery('/getInfoCampaign',body)
    

  }


}

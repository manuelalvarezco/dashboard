import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'https://www.smartdatacontact.com/datacall/api';
  token:string;
  campanas:any;
  name:string;

  constructor(private http:HttpClient) { } 

  

  login(forma:any){

    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    

    return this.http.post(`${this.apiUrl}/api_auth/login`,forma, {headers})
    .pipe(
      map( (resp:any)=>{

        if(resp.status){
          this.guardarToken( resp['token']);
          this.guardarName( resp['name']);
          this.guardarCampanas( resp['cmps']);
        }
        return resp;
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('campanas');
    localStorage.removeItem('nombre');
  }


  private guardarToken(token:string){
    this.token = token;
    localStorage.setItem('token', token)
  }

  private guardarCampanas(campanas:string){
    this.campanas = campanas;
    localStorage.setItem('campanas', JSON.stringify(campanas))
  }

  private guardarName(name:string){
    this.name = name;
    localStorage.setItem('nombre', name)
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }

    return this.token;
  }
}

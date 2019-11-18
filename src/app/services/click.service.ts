import { Injectable,Output,EventEmitter } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  private clicks:any[] = [];
  
  private dato = new BehaviorSubject<any[]>([]);

  click$ = this.dato.asObservable();

  constructor() { }

  esClickeado(dato:string){
    this.clicks = [...this.clicks, dato]
    this.dato.next(this.clicks);
  }
}

import { Injectable,Output,EventEmitter } from '@angular/core';

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  // declaración de variables
  isOpen = false;

  private datos:any[] = [];


  // comunicación servicio - componente BehaviorSubject
  private fecha = new BehaviorSubject<any[]>([]);

   // metodo Output() para crear un EventEmitter() change
   @Output() change: EventEmitter<boolean> = new EventEmitter();

  // creación del observable que se llamada en los componentes en donde se va a utilizar
  fecha$ = this.fecha.asObservable();


  constructor() { }

  // función para cambiar la fecha desde el toolbarComponent
  cambiarFecha(dato:any){
    this.datos = [...this.datos, dato]
    this.fecha.next(this.datos);
  }


  // función para abrir-cerrar el sidenav
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}

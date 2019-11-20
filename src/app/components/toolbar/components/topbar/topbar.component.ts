import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  userName = '';

  constructor() { }

  ngOnInit() {

    this.leerNombre()
  }

  leerNombre(){

    if(localStorage.getItem('nombre')){

      this.userName = localStorage.getItem('nombre');
    }else{

      this.userName = '';

    }
  }

}

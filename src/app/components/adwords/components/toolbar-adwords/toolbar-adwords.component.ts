import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar-adwords',
  templateUrl: './toolbar-adwords.component.html',
  styleUrls: ['./toolbar-adwords.component.css']
})
export class ToolbarAdwordsComponent implements OnInit {

  userName = '';

  constructor(private _toolbarService: ToolbarService) { }

  ngOnInit() {

    this.leerNombre()
  }

  general:any = {
    startDate : new Date(),
    endDate : new Date(),
    select : ''
  }

  buscar(forma:NgForm){

    let startDate = moment(forma.value.startDate).format('YYYY-MM-DD');
    let endDate = moment(forma.value.endDate).format('YYYY-MM-DD');
    let account = 'tigo'

    

    const form = {
      startDate: startDate,
      endDate : endDate,
      account : account
    }

   this._toolbarService.cambiarFecha(form)
   
   
    
  }

  leerNombre(){

    if(localStorage.getItem('nombre')){

      this.userName = localStorage.getItem('nombre');
    }else{

      this.userName = '';

    }
  }

}

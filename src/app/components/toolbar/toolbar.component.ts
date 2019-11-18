import { Component,OnInit, Output, EventEmitter, HostListener  } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'
import { ToolbarService } from 'src/app/services/toolbar.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  userName = '';

  constructor(private _toolbarService:ToolbarService) { }

  ngOnInit() {

    this.leerToken()
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

  @HostListener('click')
  opened() {
    this._toolbarService.toggle();
  }

  leerToken(){

    if(localStorage.getItem('nombre')){

      this.userName = localStorage.getItem('nombre');
    }else{

      this.userName = '';

    }
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'
import { ToolbarService } from 'src/app/services/toolbar.service';
import { ClickService } from 'src/app/services/click.service';

@Component({
  selector: 'app-toolbar-adwords',
  templateUrl: './toolbar-adwords.component.html',
  styleUrls: ['./toolbar-adwords.component.css']
})
export class ToolbarAdwordsComponent implements OnInit {

  userName = '';
  campaignId:any;


  constructor(private _toolbarService: ToolbarService, private _clickService:ClickService) { }

  ngOnInit() {

    this.leerNombre();
  
    this.dato();
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
      campaignId : this.campaignId
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

  dato(){
    this._clickService.click$.subscribe( data =>{
      
      
       // se asigna la respuesta al arreglo 
       this.campaignId = data

            

       // se obtiene el tamaño del arreglo 
       let ultimo = this.campaignId.length;

       

       // se valida la cantidad de llamado al arreglo de fechas
       if(this.campaignId.length > 0){
         ultimo = this.campaignId.length - 1 ;

       }

       this.campaignId = this.campaignId[ultimo]
      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { SdcService } from 'src/app/services/sdc.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { ClickService } from 'src/app/services/click.service';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

  forma:any;
	spiner = true;



  data: any = {};
	information: any = {};
	agents_sales: any[] = [];
  total_leads: number = 0;
  

  constructor(private _sdcService:SdcService, private _toolbarService:ToolbarService, private _clickService:ClickService) { }

  ngOnInit() {

    //este método es un observable que está declarado en services/ToolbarService
    this._toolbarService.fecha$.subscribe( (data:any)=>{

      //se le asigna la respuesta a la forma declarada al comienzo de la clase
      this.forma = data
      
      // variable que define la última posición del arreglo
      let ultimo = this.forma.length;
      
      
      //si se ha enviado la forma(fechas) varias veces se toma la última posición del arreglo
      if(this.forma.length > 0){
        ultimo = this.forma.length - 1 ;
      }

      // se realiza el llamado al método getKpi declarado en services/KpiService
    this._sdcService.getKpi(this.forma[ultimo])
    .subscribe((resp:any) =>{

      // si se obtiene una respuesra se asigna la respuesta a las variables
      if(resp.status) {

        this.spiner = false;
        this.data = resp.data;
				this.information = resp.data.informacion;
				this.information.total_leads = resp.data.total_leads.total_leads;
        this.information.total_llam = resp.data.total_llam;
				this.total_leads = resp.data.total_llam;
        this.agents_sales = resp.data.agentes_ventas;
        
			}
    })

    })
  }

  click(dato){
    this._clickService.esClickeado(dato)
  }

}

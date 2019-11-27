import { Component, OnInit } from '@angular/core';
import { AdwordsService } from 'src/app/services/adwords.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  forma:any;
  ads:any;

  displayedColumns: string[] = ['ad', 'clicks', 'impresions', 'cost', 'avgCpc','conversions','costConv'];
  dataSource  = [];

  constructor(private adwordService:AdwordsService,private _toolbarService:ToolbarService) { }

  ngOnInit() {

    this.initDashboard();

  }

  initDashboard() {


    this._toolbarService.fecha$.subscribe( (data:any)=>{

      // se asigna la respuesta al arreglo 
      this.forma = data

      // se obtiene el tamaño del arreglo 
      let ultimo = this.forma.length;

      // se valida la cantidad de llamado al arreglo de fechas
      if(this.forma.length > 0){
        ultimo = this.forma.length - 1 ;
      }

      this.adwordService.getInfoAd(this.forma[ultimo])
        .subscribe( (data:any) => {
          this.dataSource = data;
        })



    })


  }

}

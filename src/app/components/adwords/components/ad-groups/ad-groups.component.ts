import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { AdwordsService } from 'src/app/services/adwords.service';
import { ClickService } from 'src/app/services/click.service';

@Component({
  selector: 'app-ad-groups',
  templateUrl: './ad-groups.component.html',
  styleUrls: ['./ad-groups.component.css']
})
export class AdGroupsComponent implements OnInit {

  nombreCampanas:any[] = [];
  favoriteSeason: string;
  seasons:any;

  private lineClicks: Chart;
  private barraClicks: Chart;
  forma:any;
  clicksAdGroups:any;
  datos:any;
  campanas:any;
  valor_;
  nombre = '';
  costAdwords;
  letraForAdwords = '';
  opened = false;
  campaignId:any;

  constructor(private adwordService:AdwordsService,private _toolbarService:ToolbarService, private _clickService:ClickService) { }

  ngOnInit() {
    this.initDashboard();
  }

  initDashboard() {

    // se obtiene la fecha desde el observable ubicado en ToolbarService
    this._toolbarService.fecha$.subscribe( (data:any)=>{
      
      // se asigna la respuesta al arreglo 
      this.forma = data

      // se obtiene el tamaño del arreglo 
      let ultimo = this.forma.length;

      // se valida la cantidad de llamado al arreglo de fechas
      if(this.forma.length > 0){
        ultimo = this.forma.length - 1 ;
      }

      

      this.adwordService.getInfoAdGroups(this.forma[ultimo])
        .subscribe( data => {

          this.clicksAdGroups = data
          
          this.chartClicksAdGroups()
        })


        this.adwordService.getAccountReport(this.forma[ultimo])
          .subscribe((resp:any) => {
            this.campanas = resp

            this.chartClicks()
          })

        // se llamada el servivio que hace la petición a la Api services/AdwordsService
        this.adwordService.getInfoAdGroup(this.forma[ultimo])
        .subscribe( (resp:any) =>{


          this.datos = resp

          this.costAdwords = resp.cost;


            if(this.costAdwords.length < 13){

              this.letraForAdwords = 'K';
              this.costAdwords = this.costAdwords.slice(0,3);

            }else if(this.costAdwords.length > 12 && this.costAdwords.length < 14) {

              this.letraForAdwords = 'M';
              this.costAdwords = this.costAdwords.slice(0,4);

            }else{
              this.letraForAdwords = 'M';
              this.costAdwords = this.costAdwords.slice(0,2);
            }
         
        })

          

          this.adwordService.getInfoCampaign(this.forma[ultimo])
          .subscribe( (data:any)=>{
            
            this.seasons = data

            

            for(let item of this.seasons) {

              if(item.clicks[0] != 0 ){
                this.nombreCampanas.push(item.campaign)
              }
            }

          })

          // se llamada el servivio que hace la petición a la Api services/AdwordsService
          this.adwordService.getInfoAccount(this.forma[ultimo])
          .subscribe( (resp:any) =>{
            this.datos = resp
            
            this.costAdwords = resp.cost;


            if(this.costAdwords.length < 13){

              this.letraForAdwords = 'K';
              this.costAdwords = this.costAdwords.slice(0,3);

            }else if(this.costAdwords.length > 12 && this.costAdwords.length < 14) {

              this.letraForAdwords = 'M';
              this.costAdwords = this.costAdwords.slice(0,4);

            }else{
              this.letraForAdwords = 'M';
              this.costAdwords = this.costAdwords.slice(0,2);
            }
            
          })

          
          this._clickService.adwordsPerCampaign$.subscribe( data =>{

            

            // se asigna la respuesta al arreglo 
            this.campaignId = data

            

            // se obtiene el tamaño del arreglo 
            let ultimo = this.campaignId.length;

            

            // se valida la cantidad de llamado al arreglo de fechas
            if(this.campaignId.length > 0){
              ultimo = this.campaignId.length - 1 ;
            }

            

            this.adwordService.getInfoAdGroups({"campaignId":this.campaignId[ultimo]})
              .subscribe( data =>{
                this.clicksAdGroups = data
          
                this.chartClicksAdGroups()
              })
            
          })
    
    

      


    })
  }

  // instancia del chart chartClicksCampaign
  private chartClicksAdGroups() {
    const labelsMix = [];
    const llamadasMix = [];
    const colorBar = [];
    const colors = [
			"#00BFFF", "#05BBFC", "#0AB7FA", "#0FB3F8", "#14AFF6",
			"#1AABF4", "#1FA7F2", "#24A3F0", "#299FEE", "#2E9BEC",
			"#3498EA", "#3994E8", "#3E90E6", "#438CE3", "#4888E1",
			"#4E84DF", "#5380DD", "#587CDB", "#5D78D9", "#6274D7",
			"#6871D5", "#6D6DD3", "#7269D1", "#7765CF", "#7C61CD",
			"#825DCA", "#8759C8", "#8C55C6", "#9151C4", "#964DC2",
			"#9C4AC0", "#A146BE", "#A642BC", "#AB3EBA", "#B03AB8",
			"#B636B6", "#BB32B4", "#C02EB1", "#C52AAF", "#CA26AD",
			"#D023AB", "#D51FA9", "#DA1BA7", "#DF17A5", "#E413A3",
			"#EA0FA1", "#EF0B9F", "#F4079D", "#F9039B", "#FF0099"
		];
  
    // se recorre graf_traffic{} que se recibe por parámetro cuando se llama la instancia
    for(let item of this.clicksAdGroups) {

      
      
      if(item.clicks[0] != 0 ){
        labelsMix.push(item.adGroup[0]);
        llamadasMix.push(item.clicks[0]);
      }

      colorBar.push(colors[Math.floor(Math.random() * colors.length)]);
    }
  
    if (this.barraClicks) {
      this.barraClicks.clear();
      this.barraClicks.destroy();
    }
    
    // se crea el chart
    this.barraClicks = new Chart('clicksAdGroupsChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            data: llamadasMix,
            backgroundColor: colorBar
          }
        ],
        labels: labelsMix
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  // instancia del chart chartConversiones
  private chartClicks() {
    const labelsMix = [];
    const llamadasMix = [];

    // se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
    for(let item of this.campanas) {

      this.valor_ = this.campanas.reduce( this.reducerClicks,0);
      
      

        labelsMix.push(item.day);
        llamadasMix.push(item.clicks);
        

    }

    if (this.lineClicks) {
      this.lineClicks.clear();
      this.lineClicks.destroy();
    }
    
    // se crea el chart
    this.lineClicks = new Chart('clicksChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Clicks',
            data: llamadasMix,
            backgroundColor : 'transparent',
            borderColor : '#2E9AFE',
          }
        ],
        labels: labelsMix
      },
      options: {
        scales: {
          xAxes: [{
              gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  }

  reducerClicks = (acum, arreglo) =>{
    return acum + arreglo.clicks
  }

  abrir(){
    this.opened = true;
  }

  cerrar(){
    this.opened = false;
  }

  apply(favoriteSeason){
    
    this._clickService.filtroAdwordsPerCampaign(favoriteSeason)
    
    setTimeout( ()=>{
      this.opened = false;
    },2000)

  }

}

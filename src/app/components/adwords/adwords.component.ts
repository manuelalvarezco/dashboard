import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdwordsService } from 'src/app/services/adwords.service';
import { Chart } from 'chart.js';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { ClickService } from 'src/app/services/click.service';


@Component({
  selector: 'app-adwords',
  templateUrl: './adwords.component.html',
  styleUrls: ['./adwords.component.css']
})
export class AdwordsComponent implements OnInit {

  //@ViewChild('mixedChart', { read: ElementRef, static: true }) private mixedChart: ElementRef;

  private bar0: Chart;
  private barraConversions: Chart;
  forma:any;
  clickForm:any;
  datos:any;
  campanas:any;
  conversionCampaigns:any;
  valor_;
  nombre = '';

  constructor(private adwordService:AdwordsService,private _toolbarService:ToolbarService, private _clickService:ClickService) { }

  ngOnInit() {


    
    //se llamada a la función principal 
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

    // se llamada el servivio que hace la petición a la Api services/AdwordsService
    this.adwordService.getInfoAccount(this.forma[ultimo])
    .subscribe( (resp:any) =>{
      this.datos = resp
    })

    // se llamada el servivio que hace la petición a la Api services/AdwordsService
    this.adwordService.getAccountReport({})
      .subscribe( (resp:any) => {
      this.campanas = resp

      this._clickService.click$.subscribe( data =>{

        // se asigna la respuesta
        this.clickForm = data
  
        // se obtiene la longitud del arreglo
        let tamanoClickForm = this.clickForm.length;
        
        // se valida la cantidad de veces que se llamada al observable de clicks
        if(this.clickForm.length > 0){
        tamanoClickForm = this.clickForm.length - 1 ;
        }

        // se valida el parámetro que se obtiene de clickForm{}
        switch (this.clickForm[tamanoClickForm]) {
          case 'impresiones':
          this.chartImpresiones(); // se muestra el chart de solo ventas
          break;
          case 'clicks':
            this.chartClicks(); // chart clicks
            break;
          case 'costo':
            this.chartCosto(); // chart costo
            break;
          case 'cpc':
            this.chartCpc(); // chart cpc
            break;
          default:
          this.chartConversiones(); // chart general de conversiones
          break;
        }

      })
        
      })

      this.adwordService.getInfoCampaign(this.forma[ultimo])
        .subscribe( data => {

          this.conversionCampaigns = data
          console.log(data)
          this.chartConvserionCampaign()
        })

    })   


  }

  // instancia del chart chartConversiones
  private chartConversiones() {
	const labelsMix = [];
  const llamadasMix = [];
 

	// se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
	for(let item of this.campanas) {

    this.valor_ = this.campanas.reduce( this.reducer,0);
    this.nombre = 'Conversions' 

      labelsMix.push(item.day);
      llamadasMix.push(item.conversions);



  }

	if (this.bar0) {
		this.bar0.clear();
		this.bar0.destroy();
	}
	
	// se crea el chart
	this.bar0 = new Chart('conversionChart', {
		type: 'line',
		data: {
			datasets: [
				{
					label: 'Conversiones',
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



  // instancia del chart chartImpresiones
  private chartImpresiones() {
    const labelsMix = [];
    const llamadasMix = [];

    // se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
    for(let item of this.campanas) {

      this.valor_ = this.campanas.reduce( this.reducerImpresions,0);
      this.nombre = 'Impressions'
      

        labelsMix.push(item.day);
        llamadasMix.push(item.impressions);

    }

    if (this.bar0) {
      this.bar0.clear();
      this.bar0.destroy();
    }
    
    // se crea el chart
    this.bar0 = new Chart('conversionChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Impresiones',
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

  // instancia del chart chartConversiones
  private chartClicks() {
    const labelsMix = [];
    const llamadasMix = [];

    // se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
    for(let item of this.campanas) {

      this.valor_ = this.campanas.reduce( this.reducerClicks,0);
      this.nombre = 'Clicks'
      

        labelsMix.push(item.day);
        llamadasMix.push(item.clicks);

    }

    if (this.bar0) {
      this.bar0.clear();
      this.bar0.destroy();
    }
    
    // se crea el chart
    this.bar0 = new Chart('conversionChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Impresiones',
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

  // instancia del chart chartCosto
  private chartCosto() {
    const labelsMix = [];
    const llamadasMix = [];

    // se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
    for(let item of this.campanas) {

      this.valor_ = this.campanas.reduce( this.reducerCost,0);
      this.nombre = 'Cost'
        

        labelsMix.push(item.day);
        llamadasMix.push(item.cost);

    }

    if (this.bar0) {
      this.bar0.clear();
      this.bar0.destroy();
    }
    
    // se crea el chart
    this.bar0 = new Chart('conversionChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Impresiones',
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

  // instancia del chart chartCpc
  private chartCpc() {
    const labelsMix = [];
    const llamadasMix = [];

    // se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
    for(let item of this.campanas) {

      this.valor_ = 0;
      this.nombre = 'CPC'
        
        labelsMix.push(item.day);
        llamadasMix.push(item.avgCPC);

    }

    if (this.bar0) {
      this.bar0.clear();
      this.bar0.destroy();
    }
    
    // se crea el chart
    this.bar0 = new Chart('conversionChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Impresiones',
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

  // instancia del chart chartSoloLlamadas
  private chartConvserionCampaign() {
    const labelsMix = [];
    const labels = [];
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
    for(let item of this.conversionCampaigns) {

      labels.push(item.campaign.name[0]);

      
      if(item.conversions[0] != 0 ){
        labelsMix.push(item.campaign.cmp);
        llamadasMix.push(item.conversions[0]);
      }

      colorBar.push(colors[Math.floor(Math.random() * colors.length)]);
    }
  
    if (this.barraConversions) {
      this.barraConversions.clear();
      this.barraConversions.destroy();
    }
    
    // se crea el chart
    this.barraConversions = new Chart('conversionCampaignChart', {
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

  click(dato){
    this._clickService.esClickeado(dato)
  }

  reducer = (acum, arreglo) =>{
    return acum + arreglo.conversions
  }
  
  reducerImpresions = (acum, arreglo) =>{
    return acum + arreglo.impressions
  }
  
  reducerClicks = (acum, arreglo) =>{
    return acum + arreglo.clicks
  }
  
  reducerCost = (acum, arreglo) =>{
    return acum + arreglo.cost
  }
  
  reducerCpc = (acum, arreglo) =>{
    return acum + arreglo.avgCPC
  }



}

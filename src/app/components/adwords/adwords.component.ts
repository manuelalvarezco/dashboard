import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdwordsService } from 'src/app/services/adwords.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-adwords',
  templateUrl: './adwords.component.html',
  styleUrls: ['./adwords.component.css']
})
export class AdwordsComponent implements OnInit {

  //@ViewChild('mixedChart', { read: ElementRef, static: true }) private mixedChart: ElementRef;

  private bar0: Chart;


  datos:any;
  campanas:any;
  conversiones;

  constructor(private adwordService:AdwordsService) { }

  ngOnInit() {


    
    //se llamada a la función principal 
	this.initDashboard();



  }

  initDashboard() {

    // se llamada el servivio que hace la petición a la Api services/AdwordsService
    this.adwordService.getInfoAccount({})
    .subscribe( (resp:any) =>{
      this.datos = resp
      console.log(this.datos)
    })

    // se llamada el servivio que hace la petición a la Api services/AdwordsService
    this.adwordService.getAccountReport({})
      .subscribe( (resp:any) => {
      this.campanas = resp

      this.chartSoloLlamadas();
        
      })




  }

  // instancia del chart chartSoloLlamadas
  private chartSoloLlamadas() {
	const labelsMix = [];
  const llamadasMix = [];
  const colorBar = [
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

	// se recorre campanas[] que se recibe por parámetro cuando se llama la instancia
	for(let item of this.campanas) {

    this.conversiones = this.campanas.reduce( this.reducer,0);
      
      labelsMix.push(item.day);
      llamadasMix.push(item.conversions);
      colorBar.push(colorBar[Math.floor(Math.random() * colorBar.length)]);



  }

	if (this.bar0) {
		this.bar0.clear();
		this.bar0.destroy();
	}
	
	// se crea el chart
	this.bar0 = new Chart('mixedChart', {
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
			legend: {
        display: false
      }
		}
	});
}

reducer = (acum, arreglo) =>{
  return acum + arreglo.conversions
}




}

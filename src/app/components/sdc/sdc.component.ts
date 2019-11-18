import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SdcService } from 'src/app/services/sdc.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { ClickService } from 'src/app/services/click.service';


@Component({
  selector: 'app-sdc',
  templateUrl: './sdc.component.html',
  styleUrls: ['./sdc.component.css']
})
export class SdcComponent implements OnInit {

  // se obtiene la referencia a un objeto de la vista ej: getElementById('mixedChart')
  @ViewChild('mixedChart', { read: ElementRef, static: true }) private mixedChart: ElementRef;
  @ViewChild('barChart', { read: ElementRef, static: true }) private barChart: ElementRef;
  
  //Instancia de las variables
 	private bar: Chart;
 	private bar0: Chart;
	private graf_traffic: any = [];
	private graf_intention: any = {};
	private impresiones = false;


	name: string = '';
	information: any = {};
	forma:any;
	clickForm:any;
	spiner = true;
	dato:any;

  constructor(private _sdcService:SdcService, private _toolbarService:ToolbarService, private _clickService:ClickService) { }

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
      
      // se realiza el llamado al metodo getLlamadas de services/SdcService
      this._sdcService.getLlamadas(this.forma[ultimo])
      .subscribe((resp: any) => {
        if(resp.status) {
          this.spiner = false;
          this.information = resp.data.informacion;
          this.graf_traffic = resp.data.graf_trafico;
          this.graf_intention = resp.data.graf_intencion;
        }
        
  
        // Se obtiene la información del observable de los click services/ClicService
        this._clickService.click$.subscribe( data => {
          
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
            case 'ventas':
            this.chartSoloVentas(); // se muestra el chart de solo ventas
            break;
          case 'llamadas':
              this.chartSoloLlamadas(); // chart solo llamadas
              break;
          
            default:
            this.renderMixedChart(); // chart general de llamadas y ventas
            break;
          }
  
          
          
        
        })	
        
        // chart de intenciones
        this.renderBarChart();
      });
      
      
    })
  
      
    }

    // instancia del chart chartSoloLlamadas
  private chartSoloLlamadas() {
    const labelsMix = [];
    const ventasMix = [];
    const llamadasMix = [];
  
    // se recorre graf_traffic{} que se recibe por parámetro cuando se llama la instancia
    for(let item of this.graf_traffic) {
      labelsMix.push(item.key);
      llamadasMix.push(item.doc_count);
  
      if(
        item.ventas &&
        item.ventas.buckets &&
        item.ventas.buckets.length
      ) {
        ventasMix.push(item.ventas.buckets[0].doc_count);
      } else {
        ventasMix.push(0);
      }
    }
  
    if (this.bar0) {
      this.bar0.clear();
      this.bar0.destroy();
    }
    
    // se crea el chart
    this.bar0 = new Chart('mixedChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Llamadas',
            data: llamadasMix,
            backgroundColor: '#67b7dc'
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
          position: 'bottom'
        }
      }
    });
  }

  // instancia del chart chartSoloVentas
  private chartSoloVentas() {
    const labelsMix = [];
    const ventasMix = [];
    const llamadasMix = [];
  
    // se recorre graf_traffic{} que se recibe por parámetro cuando se llama la instancia
    for(let item of this.graf_traffic) {
      labelsMix.push(item.key);
      llamadasMix.push(item.doc_count);
  
      if(
        item.ventas &&
        item.ventas.buckets &&
        item.ventas.buckets.length
      ) {
        ventasMix.push(item.ventas.buckets[0].doc_count);
      } else {
        ventasMix.push(0);
      }
    }
  
    if (this.bar0) {
      this.bar0.clear();
      this.bar0.destroy();
    }
    
    // se crea el chart
    this.bar0 = new Chart('mixedChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            type: 'line',
            label: 'Ventas',
            data: ventasMix,
            borderColor: '#fdd400',
            fill: false
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
          position: 'bottom'
        }
      }
    });
    }


    // instancia del chart renderMixedChart
  private renderMixedChart() {
		const labelsMix = [];
		const ventasMix = [];
		const llamadasMix = [];

		// se recorre graf_traffic{} que se recibe por parámetro cuando se llama la instancia
		for(let item of this.graf_traffic) {
			labelsMix.push(item.key);
			llamadasMix.push(item.doc_count);

			if(
				item.ventas &&
				item.ventas.buckets &&
				item.ventas.buckets.length
			) {
				ventasMix.push(item.ventas.buckets[0].doc_count);
			} else {
				ventasMix.push(0);
			}
		}

		if (this.bar0) {
			this.bar0.clear();
			this.bar0.destroy();
		}
		
		// se crea el chart
		this.bar0 = new Chart('mixedChart', {
			type: 'bar',
			data: {
				datasets: [
					{
						type: 'line',
						label: 'Ventas',
						data: ventasMix,
						borderColor: '#fdd400',
						fill: false
					},
					{
						label: 'Llamadas',
						data: llamadasMix,
						backgroundColor: '#67b7dc'
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
					position: 'bottom'
				}
			}
		});
  }
  
  // instancia del chart renderBarChart
	private renderBarChart() {
		const labelsBar = [];
		const valuesBar = [];
		const colorBar = [];
		const tipsBar = [];
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

		// se recorre graf_intention{} que se recibe por parámetro cuando se llama la instancia
		for(let i in this.graf_intention) {
			labelsBar.push(this.graf_intention[i].k_esp);
			valuesBar.push(this.graf_intention[i].doc_count);
			colorBar.push(colors[Math.floor(Math.random() * colors.length)]);
			tipsBar.push(this.graf_intention[i].key);
		}

		if (this.bar) {
			this.bar.clear();
			this.bar.destroy();
		}

		// se crea el chart
		this.bar = new Chart('barChart', {
			type: 'horizontalBar',
			data: {
				datasets: [
					{
						data: valuesBar,
						backgroundColor: colorBar
					}
				],
				labels: labelsBar
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

}

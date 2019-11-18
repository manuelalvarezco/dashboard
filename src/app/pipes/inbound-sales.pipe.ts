import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inboundSales'
})
export class InboundSalesPipe implements PipeTransform {

  transform(ventas: any, ...args: any[]): any {
		if(
			ventas &&
			ventas.buckets &&
			ventas.buckets.length
		) {
			const venta = ventas.buckets[0];

			if(venta.key == 'True') {
				if(
					venta.tipo_vent &&
					venta.tipo_vent.buckets &&
					venta.tipo_vent.buckets.length
				) {
					let tipo_vent: any;

					for(let item of venta.tipo_vent.buckets) {
						if(item.key == 'inbound')
							tipo_vent = item;
					}

					if(args[0] == 'total')
						return tipo_vent.doc_count;

					if(args[0] == 'percentage' || args[0] == 'progress') {
						const percentage = ((tipo_vent.doc_count * 100) / venta.doc_count).toFixed(2);

						if(args[0] == 'percentage')
							return percentage;

						if(args[0] == 'progress')
							return parseFloat(percentage) / 100;
					}
				}
			}
		}

		return 0;
	}

}

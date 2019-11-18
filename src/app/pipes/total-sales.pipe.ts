import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalSales'
})
export class TotalSalesPipe implements PipeTransform {

  transform(info: any, ...args: any[]): any {
		if(
			info &&
			info.ventas &&
			info.ventas.buckets &&
			info.ventas.buckets.length
		) {
			const venta = info.ventas.buckets[0];

			if(venta.key == 'True') {
				if(args[0] == 'total')
					return venta.doc_count;

				if(args[0] == 'percentage' || args[0] == 'progress') {
					const percentage = ((venta.doc_count * 100) / info.doc_count).toFixed(2);

					if(args[0] == 'percentage')
						return percentage;

					if(args[0] == 'progress')
						return parseFloat(percentage) / 100;
				}
			}
		}

		return 0;
	}

}

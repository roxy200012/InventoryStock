import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { StockHistory } from '../../core/models/stock-history.model';
import { StockHistoryService } from '../../core/services/stock-history.service';
import { CommonModule } from '@angular/common';
import { Movement } from '../../core/models/movement.model';
import { MovementService } from '../../core/services/movement.service';
import { ProductService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-stock-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-history-component.html',
  styleUrls: ['./stock-history-component.css']
})
export class StockHistoryComponent implements OnInit {

  history: StockHistory[] = [];
  chart: any;
  movements: Movement[] = [];
  products: Product[] = [];
  constructor(private service: StockHistoryService, private movementService: MovementService,private productService: ProductService) { }

  ngOnInit(): void {
    this.service.getHistory().subscribe(data => {
      this.history = data;
      this.buildChart();
    });
    this.movementService.getMovements().subscribe(data => {
      this.movements = data;
    });
    this.productService.getProducts().subscribe(prods => {
        this.products = prods;
      });
  }
  getProductName(id: number): string {
    const p = this.products.find(x => x.id === id);
    return p ? p.name : '—';
  }

  buildChart() {

    const labels = this.history.map(h =>
      new Date(h.date).toLocaleString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    );

    const values = this.history.map(h => Number(h.totalValue));

    if (this.chart) this.chart.destroy();

    this.chart = new Chart('stockHistoryChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Valore Magazzino',
          data: values,
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13,110,253,0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

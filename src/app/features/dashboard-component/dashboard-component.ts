import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/products.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';
import { Chart } from 'chart.js/auto';
import { MovementService } from '../../core/services/movement.service';
import { Movement } from '../../core/models/movement.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
movements: Movement[] = [];
  totalProducts = 0;
  lowStock = 0;
  inventoryValue = 0;
chartInventory: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private movementService: MovementService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.movementService.getMovements().subscribe(movs => {
      this.movements = movs;

    });
  }

  loadData() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
      this.productService.getProducts().subscribe(prods => {
        this.products = prods;
        this.totalProducts = prods.length;
        this.lowStock = prods.filter(p => p.stock <= p.minStock).length;
        this.inventoryValue = prods.reduce((sum, p) => sum + (p.stock * p.price), 0);
        this.buildCategoryChart();
        this.buildStockChart();
      });
    });
  }

  buildCategoryChart() {
    const labels = this.categories.map(c => c.name);
    const data = this.categories.map(c =>
      this.products.filter(p => p.categoryId === c.id).length
     
    );
    console.log(`Categoria: ${labels[0]}, Prodotti: ${data[0]}` );
    new Chart('categoryChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Prodotti per categoria',
          data,
          backgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  buildStockChart() {
    const labels = this.products.map(p => p.name);
    const data = this.products.map(p => p.stock);

    new Chart('stockChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Stock prodotti',
          data,
          borderColor: '#198754',
          backgroundColor: 'rgba(25,135,84,0.2)',
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

  getLowStockProducts() {
    return this.products.filter(p => p.stock <= p.minStock);
  }



}

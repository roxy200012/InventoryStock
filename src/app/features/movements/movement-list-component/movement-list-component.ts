import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/products.service';
import { Movement } from '../../../core/models/movement.model';
import { MovementService } from '../../../core/services/movement.service';

@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movement-list-component.html',
  styleUrls: ['./movement-list-component.css']
})
export class MovementListComponent implements OnInit {

  movements: Movement[] = [];
  products: Product[] = [];
  filtered: Movement[] = [];

  constructor(
    private movementService: MovementService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;

      this.movementService.getMovements().subscribe(movs => {
        this.movements = movs.sort((a, b) => b.date.localeCompare(a.date));
        this.filtered = this.movements;
      });
    });
  }

  getProductName(id: number) {
    return this.products.find(p => p.id === id)?.name || '-';
  }

  filterByType(type: string) {
    this.filtered = type === 'all'
      ? this.movements
      : this.movements.filter(m => m.type === type);
  }
}

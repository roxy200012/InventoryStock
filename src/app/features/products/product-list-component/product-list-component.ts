import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { ProductService } from '../../../core/services/products.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filtered: Product[] = [];
  categories: Category[] = [];
  loading = true;
  search = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;

      this.productService.getProducts().subscribe(prods => {
        this.products = prods;
        this.filtered = prods;
        this.loading = false;
      });
    });
  }

  onSearch(value: string) {
    this.search = value.toLowerCase();
    this.filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(this.search) ||
      p.sku.toLowerCase().includes(this.search)
    );
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find(c => c.id === categoryId)?.name || '-';
  }

  getStockBadgeClass(p: Product): string {
    if (p.stock <= p.minStock) return 'low';
    if (p.stock <= p.minStock * 2) return 'medium';
    return 'high';
  }

  deleteProduct(p: Product) {
    if (!confirm(`Eliminare il prodotto "${p.name}"?`)) return;

    this.productService.deleteProduct(p.id).subscribe(() => {
      this.products = this.products.filter(x => x.id !== p.id);
      this.onSearch(this.search);
    });
  }
}
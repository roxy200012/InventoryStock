import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '../../../core/models/category.model';
import { Product } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/products.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list-component.html',
  styleUrls: ['./category-list-component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  filtered: Category[] = [];
  search = '';
  loading = true;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.productService.getProducts().subscribe(prods => {
      this.products = prods;

      this.categoryService.getCategories().subscribe(cats => {
        this.categories = cats;
        this.filtered = cats;
        this.loading = false;
      });
    });
  }

  onSearch(value: string) {
    this.search = value.toLowerCase();
    this.filtered = this.categories.filter(c =>
      c.name.toLowerCase().includes(this.search)
    );
  }

  countProducts(catId: number): number {
    return this.products.filter(p => p.categoryId === catId).length;
  }

  deleteCategory(cat: Category) {
    if (!confirm(`Eliminare la categoria "${cat.name}"?`)) return;

    this.categoryService.deleteCategory(cat.id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== cat.id);
      this.onSearch(this.search);
    });
  }
}

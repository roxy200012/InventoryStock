import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { ProductService } from '../../../core/services/products.service';
import { CategoryService } from '../../../core/services/category.service';
import { MovementService } from '../../../core/services/movement.service';
import { Movement } from '../../../core/models/movement.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail-component.html',
  styleUrls: ['./product-detail-component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  category!: Category;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private movementService: MovementService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe(prod => {
      this.product = prod;

      this.categoryService.getCategoryById(prod.categoryId).subscribe(cat => {
        this.category = cat;
        this.loading = false;
      });
    });
    this.loadMovements();

  }

  getStockBadgeClass(): string {
    if (this.product.stock <= this.product.minStock) return 'low';
    if (this.product.stock <= this.product.minStock * 2) return 'medium';
    return 'high';
  }

  deleteProduct() {
    if (!confirm(`Eliminare il prodotto "${this.product.name}"?`)) return;

    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
  movements: Movement[] = [];

 loadMovements() {
  this.movementService.getMovements().subscribe(movs => {
    this.movements = movs
      .filter(m => m.productId === this.product.id)
      .sort((a, b) => b.date.localeCompare(a.date));
  });
}
}

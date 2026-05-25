import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/products.service';
import { CategoryService } from '../../../core/services/category.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-edit-component.html',
  styleUrls: ['./product-edit-component.css']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  product!: Product;
  categories: Category[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;

      this.productService.getProductById(id).subscribe(prod => {
        this.product = prod;
        this.initForm();
        this.loading = false;
      });
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.product.name, Validators.required],
      sku: [this.product.sku, Validators.required],
      categoryId: [this.product.categoryId, Validators.required],
      stock: [this.product.stock, [Validators.required, Validators.min(0)]],
      minStock: [this.product.minStock, [Validators.required, Validators.min(0)]],
      price: [this.product.price, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.form.invalid) return;

    const updated: Product = {
      ...this.product,
      ...this.form.value
    };

    this.productService.updateProduct(updated).subscribe(() => {
      this.router.navigate(['/products', updated.id]);
    });
  }
}

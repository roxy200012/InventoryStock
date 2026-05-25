import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/products.service';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-new-component.html',
  styleUrls: ['./product-new-component.css']
})
export class ProductNewComponent implements OnInit {

  form!: FormGroup;
  categories: Category[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
      this.initForm();
      this.loading = false;
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      categoryId: [null, Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      minStock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.form.invalid) return;

    const newProduct: Product = {
      id: 0, // JSON-server lo genera automaticamente
      ...this.form.value
    };

    this.productService.createProduct(newProduct).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}

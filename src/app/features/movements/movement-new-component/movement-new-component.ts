import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/products.service';
import { MovementService } from '../../../core/services/movement.service';
import { Product } from '../../../core/models/product.model';
import { Movement } from '../../../core/models/movement.model';

@Component({
  selector: 'app-movement-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './movement-new-component.html',
  styleUrls: ['./movement-new-component.css']
})
export class MovementNewComponent implements OnInit {

  form!: FormGroup;
  products: Product[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private movementService: MovementService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
      this.initForm();
      this.loading = false;
    });
  }

  initForm() {
    this.form = this.fb.group({
      productId: [null, Validators.required],
      type: ['IN', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;

    const movement: Movement = {
      id: 0,
      ...this.form.value
    };

    const product = this.products.find(p => p.id === movement.productId)!;

    // Aggiorna stock
    const updatedProduct: Product = {
      ...product,
      stock: movement.type === 'IN'
        ? product.stock + movement.quantity
        : product.stock - movement.quantity
    };

    // Salva movimento + aggiorna prodotto
    this.movementService.createMovement(movement).subscribe(() => {
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.router.navigate(['/movements']);
      });
    });
  }
}

import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list-component/product-list-component';
import { ProductNewComponent } from './features/products/product-new-component/product-new-component';
import { ProductDetailComponent } from './features/products/product-detail-component/product-detail-component';
import { ProductEditComponent } from './features/products/product-edit-component/product-edit-component';
import { CategoryListComponent } from './features/categories/category-list-component/category-list-component';
import { CategoryNewComponent } from './features/categories/category-new-component/category-new-component';
import { CategoryEditComponent } from './features/categories/category-edit-component/category-edit-component';
import { DashboardComponent } from './features/dashboard-component/dashboard-component';
import { MovementNewComponent } from './features/movements/movement-new-component/movement-new-component';
import { MovementListComponent } from './features/movements/movement-list-component/movement-list-component';
import { StockHistoryComponent } from './features/stock-history-component/stock-history-component';



export const routes: Routes = [

  // HOME → redirect alla lista prodotti
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // PRODUCTS
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductNewComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/:id/edit', component: ProductEditComponent },

  // CATEGORIES
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/new', component: CategoryNewComponent },
  { path: 'categories/:id/edit', component: CategoryEditComponent },
  { path: 'movements/new', component: MovementNewComponent },
 {path: 'movements',    component: MovementListComponent},
{ path: 'dashboard', component: DashboardComponent },
{path :'stock-history',component: StockHistoryComponent}

];

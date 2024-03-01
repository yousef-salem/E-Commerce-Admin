import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './Modules/products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './Modules/products/components/product-details/product-details.component';
import { CartComponent } from './Modules/carts/components/cart/cart.component';

const routes: Routes = [
  {path:"products", component: AllProductsComponent},
  {path:"details/:id", component: ProductDetailsComponent},
  {path:"cart", component: CartComponent},
  {path:"**", redirectTo:"cart", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

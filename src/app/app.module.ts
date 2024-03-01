import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Modules/shared/shared.module';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProductsModule } from './Modules/products/products.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './Modules/carts/components/cart/cart.component';
import { CartsModule } from './Modules/carts/carts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CartsModule,
    HttpClientModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule ,
    CurrencyPipe,
    DatePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

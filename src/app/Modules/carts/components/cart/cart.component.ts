import { Component } from '@angular/core';
import { CartItem } from 'src/app/model/CartItem';
import { CartsService } from '../../service/carts.service';
import { Cart } from 'src/app/model/Cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { ProductsService } from 'src/app/Modules/products/service/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // isDone = false;
  isLoading = false;
  isLodingDialog = false;
  carts : Cart[] = [];
  formDate: FormGroup ;
  productOfCart : CartItem[] = []; 
  currentTotal = 0;
  constructor(private cartService : CartsService ,private fb : FormBuilder ,private productService : ProductsService) {
    this.formDate = this.fb.group({
      startDate : ['',Validators.required],
      endDate : ['',Validators.required]
    })
    this.getCarts();
  }
  deleteItem(item : Cart){
    this.cartService.deleteCarts(item.id).subscribe({
      next : (res)=>{
        this.cartService.onResponseSuccess("Success", "Delete Carts");
        let index = this.carts.indexOf(item);
        this.carts.splice(index, 1);
        console.log(res);
      },
      error : (err)=>{
        this.cartService.onResponsefaild(err);
        console.log(err);
      }
    })

    // localStorage.setItem("cart", JSON.stringify(this.products));
  }
  clearCart(){
    this.carts = [];
    // localStorage.removeItem("cart");
  }
  getCarts(){
    this.isLoading = true;
    this.cartService.getAllCarts().subscribe({
      next : (res)=>{
        this.isLoading = false;
        this.carts = res;
        this.cartService.onResponseSuccess("Success", "Get All Carts");
        console.log(res);
      },
      error : (err)=>{
        this.isLoading = false;
        this.cartService.onResponsefaild(err);
        console.log(err);
      }
    });
  }
  getQuantityforCart(item : Cart){
    let quantity = 0;
    item.products.forEach(element => {
      quantity += element.quantity;
    });
    return quantity;
  }
  getCartsinDateRange(startDate : string, endDate : string){
    this.isLoading = true;
    this.cartService.getCartsByDate(startDate, endDate).subscribe({
      next : (res)=>{
        this.isLoading = false;
        this.carts = res;
        this.cartService.onResponseSuccess("Success", "Get All Carts");
        console.log(res);
      },
      error : (err)=>{
        this.isLoading = false;
        this.cartService.onResponsefaild(err);
        console.log(err);
      }
    });
  }
  submit(){
    if(this.formDate.invalid){
      console.log("Invalid form")
      this.getCarts();
      return;
    }
    this.getCartsinDateRange(this.formDate.value.startDate, this.formDate.value.endDate);
  }
  getProductsofCart(index : number){
    let products = this.carts[index].products.map((item)=>{
      return item.productId ;
    });
    let productsItems : Product[] = [];
    for(let i = 0 ; i < products.length ; i++){
      this.isLodingDialog = true;
    this.productService.getProduct(products[i]).subscribe({
        next : (res : Product)=>{
          productsItems.push(res)
          console.log(res);
          if(i == products.length - 1){
            this.productOfCart = productsItems.map((item)=>{
              return {
                product : item,
                quantity : this.carts[index].products.find((product)=> product.productId == item.id)!.quantity
              }
            });
            this.getTotal();
            this.isLodingDialog = false;
            console.log(this.productOfCart);
          }
        },
        error : (err: any)=>{
          if(i == products.length - 1){
            this.isLodingDialog = false;
          }
          console.log(err);
        }
      })
    }
    
  }
  getTotal(){
    let total = 0;
    this.productOfCart.forEach((item)=>{
      total += item.product.price * item.quantity;
    });
   this.currentTotal = total;
  }

  
}

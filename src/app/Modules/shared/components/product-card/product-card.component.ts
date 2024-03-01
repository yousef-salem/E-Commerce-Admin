import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/CartItem';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input() product! : Product ;
@Output() addToCart : EventEmitter<any> = new EventEmitter();
tempCartItem! : CartItem ;
amount : number = 0;

  constructor(){
    
  }

  add($event : any){
    if(this.amount<10){
      console.log(this.amount);
      this.amount++;
      this.tempCartItem = {
        product : this.product,
        quantity : this.amount
      }
      this.addToCart.emit(this.tempCartItem);
      
    }
  }

}

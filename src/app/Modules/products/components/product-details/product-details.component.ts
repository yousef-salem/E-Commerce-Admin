import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product : Product={} as Product;
isLoading : boolean = false;
  constructor(private route: ActivatedRoute ,private productService : ProductsService){
    this.product.id=this.route.snapshot.params['id'];
    console.log(this.product.id);
    
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.getProduct();
  }
  
  getProduct(){
    this.productService.getProduct(this.product.id).subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.productService.onResponseSuccess('Success', 'Product Loaded');
        this.product = res;
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
}

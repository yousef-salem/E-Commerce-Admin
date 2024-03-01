import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/Cart';
import { ApiService } from 'src/app/service/api.service';
import { ProductsService } from '../../products/service/products.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private apiService : ApiService ) { }

  getAllCarts(){
    return this.apiService.getAll<Cart[]>('/carts') ;
  }
  getCartsByDate(startDate : string, endDate : string){
    return this.apiService.getAll<Cart[]>('/carts?startDate='+startDate+'&endDate='+endDate);
  }

  deleteCarts(id : number){
    return this.apiService.Delete('/carts/'+id) ;
  }
  onResponseSuccess(Title :string, body : string){
    this.apiService.onResponseSuccess(Title, body);
  }
  onResponsefaild(error : any){
    this.apiService.onResponsefaild(error);
  }
}

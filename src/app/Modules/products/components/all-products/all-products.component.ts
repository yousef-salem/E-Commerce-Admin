import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from 'src/app/model/Product';
import { CartItem } from 'src/app/model/CartItem';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  products:Product[]=[];
  categories:string[]=[];
  category:string = "All";
  isLoading : boolean = false;
  cartProducts : CartItem[]= [];
  tempCartItem! : CartItem ;
  isLoadingDialog = false;
  productForm : FormGroup;
  base64 : any ='';
  dialogStatus : string = 'Add';
  CurrentProduct! : Product ;
  constructor(private productService : ProductsService,private fb : FormBuilder){
   this.productForm = this.fb.group({
    category: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    title: ['', Validators.required]
   })
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts(){
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.products = res;
        this.productService.onResponseSuccess('Success', 'Products Loaded');
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
  getCategories(){
    this.isLoading = true;
    this.productService.getAllCategorys().subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.categories = res;
        this.productService.onResponseSuccess('Success', 'Products Loaded');
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
 filterByCategory($event : any){
  console.log($event);
    if($event == "All"){
      this.getProducts();
    }else{
      this.getProductsBCategory($event);
    }
  }
  getProductsBCategory(category : string){
    this.isLoading = true;
    this.productService.getProductsByCategory(category).subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.products = res;
        this.productService.onResponseSuccess('Success', 'Products Loaded');
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
  addToCart($event : any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item : CartItem)=> item.product.id == $event.product.id);
      if(exist){
        exist.quantity = $event.quantity;
      }else{
      
        this.cartProducts.push($event);
      }
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }else{
      this.cartProducts.push($event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
  addProduct(product:Product){
    this.isLoadingDialog = true;
    this.productService.addProduct(product).subscribe({
      next:(res)=>{
        this.products.push(res);
        this.productService.onResponseSuccess('Success', 'Product Added');
        this.productForm.reset();
        this.isLoadingDialog = false;
      },error:(err)=>{
        this.productService.onResponsefaild(err);
        console.log(err);
        this.isLoadingDialog = false;
      }
    });
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      // Form is valid, you can access form values using this.productForm.value
      console.log("Form is valid");
      console.log(this.productForm.value);
      if(this.dialogStatus == "Update"){
        this.updateProduct(this.productForm.value)
      }else if(this.dialogStatus == "Add"){
        this.addProduct(this.productForm.value)
      }
      
    } else {
      // Form is invalid, handle validation errors
      console.log("Form is invalid");
    }
  }
  getImgPath($event : any){
    console.log($event.target.files[0]);
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.productForm.get('image')?.setValue($event.target.value);
      console.log(reader.result);
      this.base64 = reader.result;
    };
  }
  setCategoryForForm($event : any){
    this.productForm.get('category')?.setValue($event);
  }
  setStatusUPdate(status : string,product : Product){
    this.dialogStatus = status;
    this.productForm.get('category')?.setValue(product.category);
    this.productForm.get('description')?.setValue(product.description);
    this.productForm.get('image')?.setValue(product.image);
    this.productForm.get('price')?.setValue(product.price);
    this.productForm.get('title')?.setValue(product.title);
    this.CurrentProduct = product;
  }
  updateProduct(product : Product){
    this.isLoadingDialog = true;
    this.productService.updateProduct(product , this.CurrentProduct.id).subscribe({
      next:(res)=>{
        this.productService.onResponseSuccess('Success', 'Product Updated');
        this.productForm.reset();
        this.isLoadingDialog = false;
      },error:(err)=>{
        this.productService.onResponsefaild(err);
        console.log(err);
        this.isLoadingDialog = false;
      }
    });
  }
}

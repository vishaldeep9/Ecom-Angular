import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { cart, product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  public productData: undefined | product;
  productQuantity:number=1
  removeCart:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}
  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId &&
      this.productService.getProductById(productId).subscribe((data) => {
        this.productData = data;
      });
      // remove to cart button will be visible using this condition
      let cartData=localStorage.getItem('localCart');
      if(productId && cartData){
        let items= JSON.parse(cartData);
        //* if item is present with this id then store that inside cartItems
       let cartItems=items.filter((item:product)=>productId==item.id);
       if(cartItems.length){
        this.removeCart=true;
       }else{
        this.removeCart=false;
       }
      }
  }
  handleQuantity(val: string) {
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min')
      this.productQuantity-=1;
  }
  addToCart(){
    // * if we have some product details 
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      //* if user is not sign in
      if(!localStorage.getItem('user')){
        this.productService.localAddToCart(this.productData);
        this.removeCart=true;
        // console.warn(this.productData);
      }
      //* if user is already sign in 
      else {
        console.log('user is logged in')
        let user=localStorage.getItem('user');
        //&means user is not null, then store there id in userId
        let userId=user && JSON.parse(user).id
        console.log("userId: "+userId);
        let cartData:cart={
          //? e triple dot (...) is known as the spread operator in JavaScript.
          //? It is used to "spread" or expand an iterable (like an array or an object) into individual elements.
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        // console.log(cartData)
        this.productService.addToCartByApi(cartData).subscribe((data)=>{
          // console.log(data);
          alert("product is added in cart")
        })
        this.removeCart=true;
      }
    }
  } 
  removeToCart(productId:string){
   this.productService.removeItemsFromCart(productId);
   this.removeCart=false;
  }
}

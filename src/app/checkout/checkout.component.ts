import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart, order } from '../data-types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number=0;
  cartData:cart[]|undefined;//doing it for my order history page
  orderMsg:string|undefined;

  constructor(private _productService:ProductsService,private router:Router){}
  ngOnInit(){
    this._productService.currentCart().subscribe((data) => {
      let price=0;
      this.cartData=data; //doing it for my order history page
      data.forEach((item)=>{
       if(item.quantity){
        price=price+(item.price*item.quantity);
       }
      })
this.totalPrice=price+(price/5)-(price/10)+100
    });
  }

  orderNow(data:{email:string,address:string,contact:string}){
  let user=localStorage.getItem('user');
  let userId=user && JSON.parse(user).id;

  if(this.totalPrice){
    let orderData:order={
      ...data,
      userId,
      totalPrice:this.totalPrice,
      id:undefined
    }
    // this is for removing cart item on by one ,after ordering
    this.cartData?.forEach((cart)=>{
   setTimeout(() => {
   cart.id && this._productService.deleteCartItems(cart.id)
   }, 1000);
    })
    this._productService.orderNow(orderData).subscribe((result)=>{
      this.orderMsg="your order has been placed";
      setTimeout(() => {
        this.router.navigate(['/my-orders']);
        this.orderMsg=undefined;
      }, 4000);
   
    })
  }
  }
}
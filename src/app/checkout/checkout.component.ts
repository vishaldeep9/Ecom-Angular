import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { order } from '../data-types';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number=0;

  constructor(private _productService:ProductsService){}
  ngOnInit(){
    this._productService.currentCart().subscribe((data) => {
      let price=0;
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
      totalPrice:this.totalPrice
    }
    this._productService.orderNow(orderData).subscribe((result)=>{
      alert("order placed")
      console.log(result)
    })
  }
  }
}
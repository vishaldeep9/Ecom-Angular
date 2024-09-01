import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  // bcz it is product array 
  productList:undefined| product[]
  deleteMessage:string|undefined;
  icon=faTrash
  updateIcon=faEdit
 constructor(private productService:ProductsService){}
 ngOnInit():void
 {
this.totalProductList();
 }
 deleteProduct(id:string){
  console.log(id)
  this.productService.deleteProduct(id).subscribe((result)=>{
    if(result){
   this.deleteMessage="product is deleted"
   this.totalProductList();
    }
  });
  setTimeout(()=>{
    this.deleteMessage=undefined
  },3000)
 }
 totalProductList(){
  this.productService.getProductList().subscribe((data)=>{
    console.log(data)
    this.productList=data;
  })
 }
}

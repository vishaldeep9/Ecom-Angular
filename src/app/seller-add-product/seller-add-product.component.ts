import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {}

  submit(data: product) {
       
   this.productService.addProduct(data).subscribe((result)=>{
    console.warn(result);
    if(result){
      this.addProductMessage="product is successfully added";
  
    }
    setTimeout(()=>this.addProductMessage=undefined,3000)
   })
  
  }
}

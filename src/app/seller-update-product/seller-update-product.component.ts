import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  updatedProduct: product | undefined;
  productMessage:string|undefined;
  // for data pre-filling
  productDetail: undefined | product
  //catching that id , so that based on that id we can fetched data from api
  constructor(private route: ActivatedRoute, private productService: ProductsService,private router:Router) { }
  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId);
    // if product is not null then go for further operation
    productId && this.productService.getProductById(productId).subscribe((data) => {
      console.log(data)
      this.productDetail = data
    })
  }
  update(product: product) {
    // if data exists in this productDetail
    if(this.productDetail){
      product.id=this.productDetail.id
    }
    this.productService.updateProduct(product).subscribe((data) => {
      console.log(data)
      if(data){
        this.productMessage="product has been updated"  
      }
    });
    setInterval(()=>{
      this.productMessage=undefined;
      this.router.navigate(['/seller-home']);
    },3000)
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  public productData: undefined | product;
  productQuantity:number=1
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
  }
  handleQuantity(val: string) {
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min')
      this.productQuantity-=1;
  }
}

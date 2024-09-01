import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|product[]
constructor(private activatedRoute:ActivatedRoute,private productService:ProductsService){}
ngOnInit(){
  let result=this.activatedRoute.snapshot.paramMap.get('query')
  console.warn(result);
  result && this.productService.searchProducts(result).subscribe((data)=>{
    this.searchResult=data;
  })
  
}
}

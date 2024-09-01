import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  getProductList()
  {
    // now api will product type of data <product[]>
   return this.http.get<product[]>("http://localhost:3000/products")
  }
  deleteProduct(id:string){
   return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProductById(id:string){
    // api return will be in product type ,& not using [] bcz there is single data returning 
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:product){
    console.log(product.id)
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }
  popularProducts()
  {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=2")
  }
  trendyProducts()
  {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=8")
  }
  searchProducts(query:string)
  {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cartDataSubject: EventEmitter<product[] | []> = new EventEmitter();
  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  getProductList() {
    // now api will product type of data <product[]>
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProductById(id: string) {
    // api return will be in product type ,& not using [] bcz there is single data returning
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: product) {
    console.log(product.id);
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=2');
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    //* if there is already nothing inside localstorage
    if (!localCart) {
      //^ Why [data] array? -> bcz our cartData is array & we are storing that updated cartData in else condition ,so we if have to take array [data] bcz in starting if i define data as object then it will be treat as object forever during saving in local storage
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
    // * if is there is already something inside localstorage
    else {
      //& we can't read data directly which is coming from localStorage
      //& here after parse storing that data inside cartData
      cartData = JSON.parse(localCart);
      //& adding current data inside cartData []
      cartData.push(data);
      //& after updating cartData ,we are storing into localStorage
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartDataSubject.emit(cartData);
  }
  removeItemsFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      // * it is map function/for loop , one by one data will fetch and stored inside items a/c to condition
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartDataSubject.emit(items);
      //& here , deleting one item directly we are fetching apart from this item and updating storing
    }
  }

  addToCartByApi(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
}

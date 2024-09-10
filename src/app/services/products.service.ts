import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-types';
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
      this.cartDataSubject.emit([data]);
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
  // * right now , only current computer know what is the userId & based on that in local computer it is showing cart, but if logged in from different computer with same userId the automatically saved cart iTem should be display in the cart based on relevant userId
  getCartListById(userId: string) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log(result);
        if (result && result.body) {
          //? result.body bcz our object is coming inside body
          this.cartDataSubject.emit(result.body);
        }
      });
  }
  removeToCartById(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userId);
  }
  orderNow(data:order){
    return this.http.post("http://localhost:3000/orders",data);
  }

  //? to showing order history
  myOrderList(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userId);
  }
  //? for doing empty cart item after placing order
  deleteCartItems(cartId:string){
    return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        //? here only we are deleting one object 
        this.cartDataSubject.emit([]);
      }
    })
  }
  cancelOrder(orderId:string){
    return this.http.delete("http://localhost:3000/orders/"+orderId);
  }
}

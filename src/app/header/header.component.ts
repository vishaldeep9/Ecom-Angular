import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // to check which type it is like , seller or user & using this we will apply condition on html page
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems = 0;
  constructor(private route: Router, private productService: ProductsService) {}

  ngOnInit(): void {
    // if something changes on route then, check
    this.route.events.subscribe((value: any) => {
      // console.warn(value);
      if (value.url) {
        //catching url ~ means end point of url we are checking after catching
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          console.log('we are in seller Area');
          this.menuType = 'seller';
          //all this is for printing seller name on navbar
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            // ist it check it is not empty && then as we the data we gets form local storage is in form of string so, we have to parse/or convert into json form of that data  , bcz it was stored on 0 order array in localstorage
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          //  checking that userStore is not undefined
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartListById(userData.id)
        } else {
          console.log('we are in outside of seller area');
          this.menuType = 'default';
        }
      }
     });
     
     let cartData = localStorage.getItem('localCart');
     if (cartData) {
       this.cartItems = JSON.parse(cartData).length;
      }
      // console.log(this.cartItems);
      //* problem form local storage was , it was updating cart quantity after refresh  
      this.productService.cartDataSubject.subscribe((result)=>{
        this.cartItems=result.length;
      })

  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    //after logged out , cart quantity should be 0
    this.productService.cartDataSubject.emit([]);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLTextAreaElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(value: string) {
    console.warn(value);
    this.route.navigate([`search/${value}`]);
  }
  redirectToDetails(id: string) {
    this.route.navigate([`/product-detail/${id}`]);
  }
}

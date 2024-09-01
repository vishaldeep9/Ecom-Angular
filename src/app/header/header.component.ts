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

  constructor(private route: Router, private productService: ProductsService) {}

  ngOnInit(): void {
    // if something changes on route then, check
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        console.log(value.url);
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
        } else {
          console.log('we are in outside of seller area');
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
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
  this.route.navigate([`search/${value}`])
  }
  redirectToDetails(id: string) {
   this.route.navigate([`/product-detail/${id}`])
    }
}

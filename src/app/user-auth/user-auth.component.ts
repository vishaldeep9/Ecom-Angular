import { Component } from '@angular/core';
import { cart, login, product, signUp } from '../data-types';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  isLogin: boolean = true;
  authError: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private _productService: ProductsService
  ) {}
  ngOnInit() {
    this.userService.userAuthReload();
  }
  signUp(data: signUp) {
    this.userService.userSignUp(data);
  }
  login(data: login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'please enter valid user details';
      } else {
        //* just after log in , we are adding local stored cart item to dataBase cart
        this.localCartToRemoteCart();
      }
    });
  }
  openSignUp() {
    this.isLogin = false;
  }
  openLogin() {
    this.isLogin = true;
  }

  //^ after log-in local stored cart item will be automatically add to db cart
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      //^ second parameter of foreach loop is index
      //^ one by one adding local to remote cart after log-in
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          userId,
          productId: product.id,
        };
        // deleting id existing id bcz , cart itself will make new id at the time of storing into database
        delete cartData.id;
        //& bcz json is not powerful , it can give error message
        setTimeout(() => {
          this._productService.addToCartByApi(cartData).subscribe((result) => {
            if (result) {
              console.log('successfully added local cart to remote cart');
            }
          });
        }, 500);
        //^ means last has came, we are on last item , length = index+1
        if (cartDataList.length == index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
   setTimeout(() => {
    this._productService.getCartListById(userId);
   }, 2000);
  }
}

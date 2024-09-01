import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-types';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  //so, that i can go on seller-home after sign up and sign in only
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  // to know that successfully logged in or not on UI itself
  isLoginError=new EventEmitter<boolean>(false)

  //we have to keep seller data into local storage so, that after refresh still seller will be in seller-home-page
  //bcz result there will be lots of data and we can't keep  directly(in form of object) into local storage , so we need seller body and that body should be in from of JSON.Stringyf and we keep in this form into local storage
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signUp) {
    return (
      this.http
        .post("http://localhost:3000/'seller", data, { observe: 'response' })
        // to get JSON server request we are taking observerf
        .subscribe((result) => {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        })
    );
  }
  //if i sign up and logged in and that data will be stored in localstorage then now, we can directly go  seller-home-page after clicking on button not after refresh
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  // -----------login part
  userLogin(data: login) {
    return this.http
      .get(
        `http://localhost:3000/'seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          alert('seller successfully logged in');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          // alert('login failed');
          this.isLoginError.emit(true)
        }
      });
  }
}

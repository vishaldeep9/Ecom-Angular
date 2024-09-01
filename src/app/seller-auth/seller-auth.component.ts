import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
// import { Router } from '@angular/router';
import { signUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  showLogin: boolean = false;
  authError:string=""
  constructor(private seller: SellerService) {}
  ngOnInit(): void {
    //this function is for checking that my data is stored in local storage or not at time of re-loading
    this.seller.reloadSeller();
  }
  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }

  login(data: signUp) {
    // "" so, that this error msg wil not be printed permanently,that's why at the time of again login i am doing it empty
    this.authError=""
    this.seller.userLogin(data)
    //after clicking on button we will check that error is coming or not 
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct"
      }
    })
  }
}

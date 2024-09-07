import { Component } from '@angular/core';
import { login, signUp } from '../data-types';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  isLogin: boolean = true;
  authError:string=''
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.userService.userAuthReload();
  }
  signUp(data: signUp) {
    this.userService.userSignUp(data);
  }
  login(data: login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError="please enter valid user details"
      }
    })
  }
  openSignUp() {
    this.isLogin = false;
  }
  openLogin() {
    this.isLogin = true;
  }
}

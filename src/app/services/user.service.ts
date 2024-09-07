import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth=new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(userData: signUp) {
    console.warn(userData);
    //if we want to check his response with body  so, we have to use observe
    return this.http
      .post('http://localhost:3000/users', userData, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        // but result is included with body & headers
        if (result) {
          //bcz result there will be lots of data and we can't keep  directly(in form of object) into local storage , so we need seller body and that body should be in from of JSON.Stringify and we keep in this form into local storage
          localStorage.setItem('user', JSON.stringify(result.body));
          console.warn(JSON.stringify(result.body));
          //Use of JSON.stringify: It converts a JavaScript object (like result.body) into a JSON string format that can be stored in localStorage.
          //The localStorage API can only store data as strings.
          this.router.navigate(['/']);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
  userLogin(data: login) {
    // console.log(data);
    //means this api will return signup type []
  return  this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
    // it will return only when we gave correct email & password otherwise it return empty []
    if(result && result.body?.length){ 
      this.invalidUserAuth.emit(false);
      localStorage.setItem('user',JSON.stringify(result.body[0]));
      this.router.navigate(['/'])
      console.log(JSON.stringify(result.body))
    }
    else {
this.invalidUserAuth.emit(true);
    }
  })}
  
}

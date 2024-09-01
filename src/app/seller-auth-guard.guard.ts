import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthGuardGuard implements CanActivate {
  
  constructor(private sellerService: SellerService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree 
    {
      //this will allow us to go (1)directly in seller-home after sign up through end point url directly (2) after refresh(when we will be in seller home page ) still we will be in seller home page
      //refresh and directly through end point both meaning is same
      if(localStorage.getItem('seller')){
        return true;
      }
    return this.sellerService.isSellerLoggedIn;
  }
}

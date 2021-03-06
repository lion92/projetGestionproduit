import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {UserserviceService} from "./userservice.service";

@Injectable({
  providedIn: 'root'
})
export class GuardlinkService implements CanActivate  {

  constructor(public userService:UserserviceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getBoolConnecter();
  }
}

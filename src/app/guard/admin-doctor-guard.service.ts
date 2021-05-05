import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminDoctorGuard implements CanActivate {
  role: string;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    return jwtDecode(sessionStorage.getItem('token')).role === 'ROLE_DOCTOR' || jwtDecode(sessionStorage.getItem('token')).role === 'ROLE_ADMIN';
  }

}

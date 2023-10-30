import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerEndpoint = 'register';
  private loginEndpoint = 'login';
  private tokenKey = 'auth_token';
  private userKey!: string;
  private isAuthenticatedUser = false;
  private authSecretKey = 'Bearer Token';

  constructor(private httpService: HttpService, private router: Router) {
    this.isAuthenticatedUser = !!localStorage.getItem(this.authSecretKey);
  }

  registerUser(userData: any): Observable<any> {
    return this.httpService.post(this.registerEndpoint, userData);
  }

  loginUser(credentials: any) {
    return this.httpService.post(this.loginEndpoint,credentials);
  }

  logoutUser(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticatedUser = false;
    this.router.navigateByUrl("/").then(r => console.log(r));
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }
  getToken(){
    return localStorage.getItem('token')||'';
  }

  getCurrentUserId(): number | null {
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      const user = JSON.parse(userData);
      return user.id;
    }
    return null;
  }

  haveAccess(){
    const loggingToken = localStorage.getItem('token') || '';
    const extractedToken= loggingToken.split('.')[1];
    const atobData= atob(extractedToken);
    const finalData = JSON.parse(atobData);
    if(finalData.role === 'admin'){
      return true;
    } else {
      alert('you not having access');
      return false;
    }
  }

}

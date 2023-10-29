import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerEndpoint = 'register'

  constructor(private httpService: HttpService) { }

  registerUser(userData: any): Observable<any> {
    return this.httpService.post(this.registerEndpoint, userData);
  }

}

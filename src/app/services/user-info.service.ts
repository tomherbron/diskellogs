import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpService: HttpService) { }

  getUserById(userId: number){
    return this.httpService.get('home');
  }
}

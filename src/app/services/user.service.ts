import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private homeEndpoint: string = 'home';

  constructor(private httpService: HttpService) { }

  fetchUser(): Observable<any> {
    return this.httpService.get(this.homeEndpoint);
  }



}

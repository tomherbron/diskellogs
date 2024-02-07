import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEndpoint: string = 'user';
  private addRecordEndpoint: string = 'add-record';

  constructor(private httpService: HttpService) { }

  fetchUser(): Observable<any> {
    return this.httpService.get(this.userEndpoint);
  }

  addRecord(recordData: any): Observable<any> {
    return this.httpService.put(this.addRecordEndpoint, recordData);
  }



}

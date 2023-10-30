import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {

  constructor() { }

  mapDataForLogin(credentials: any): any {
    return {
      email: credentials.email,
      password: credentials.password
    }
  }

  mapDataToAPI(dataFromFrontend: any): any {
    return {
      first_name: dataFromFrontend.firstName,
      last_name: dataFromFrontend.lastName,
      email: dataFromFrontend.email,
      password1: dataFromFrontend.password,
      password2: dataFromFrontend.passwordConf,
      address: dataFromFrontend.address,
      zip_code: dataFromFrontend.zipCode,
      city: dataFromFrontend.city
    };
  }

}

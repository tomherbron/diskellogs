import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {

  constructor() { }

  mapUserDataForLogin(credentials: any): any {
    return {
      email: credentials.email,
      password: credentials.password
    }
  }

  mapUserDataToAPI(dataFromFrontend: any): object {
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

  mapRecordDataToApi(dataFromFrontend: any): object {
    return {
      ref: dataFromFrontend.ref,
      title: dataFromFrontend.title,
      artist: dataFromFrontend.artist,
      genre: dataFromFrontend.genre,
      price: dataFromFrontend.price,
      release_year: dataFromFrontend.releaseYear,
    }
  }

}

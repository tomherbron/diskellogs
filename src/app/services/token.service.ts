import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !! token;
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

export interface Bearer {
  accessToken: string;
}

export interface Validity {
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {

    return this.http
      .post<Bearer>('/v1/auth/login', { username: username, password: password })
      .pipe(
        tap(data => this.setSession(data.accessToken))
      );
  }

  private setSession(authResult: string) {
    localStorage.setItem('auth_token', authResult);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  public async isLoggedIn(): Promise<boolean> {
    
    if (
      localStorage.getItem('auth_token') != null &&
      localStorage.getItem('auth_token') != ''
    ) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${this.getToken()}`
        })
      };

      const res = await this.http.get<Validity>('/v1/auth/validate', httpOptions).toPromise();
      return res.status;
      
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}

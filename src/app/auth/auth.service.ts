import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { User } from '../models/user';
import { decode } from 'jwt-simple';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uriseg = 'http://localhost:5000/api/users';
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  public updateUser(userData: any): Observable<User[]> {
    const URI = this.uriseg + '/updateUser';
    return this.http.put<User[]>(URI, userData);
  }

  public deleteUser(userData: any): Observable<{}> {
    const URI = this.uriseg + '/deleteUserById/' + userData;
    console.log(URI);
    return this.http.delete(URI);
  }

  public getUsers(): Observable<User[]> {
    const URI = this.uriseg + '/userFromDb';
    return this.http.get<User[]>(URI);
  }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }

  public login(userData: any): Observable<any> {
    console.log("auth.service.ts - userData: " + JSON.stringify(userData));
    const URI = this.uriseg + '/login';
    console.log("URI: " + URI);
    return this.http.post(URI, userData).pipe(map(data => {
      console.log("auth.service.ts - User Data: " + JSON.stringify(data));
      var token = JSON.parse(JSON.stringify(data)).token;
      console.log("Token: " + token);
      return this.saveToken(token);
    }));
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));

    this.decodedToken.exp = '365d';
    console.log("Decoded Token: " + JSON.stringify(this.decodedToken));
    console.log("Token Expires: " + jwt.getTokenExpirationDate(token));
    console.log("Decoded Token Expires: " + this.decodedToken.exp);

    return token;
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new DecodedToken();
  }

  // Checks if current token is expired
  public isAuthenticated(): boolean {
    return (this.decodedToken.exp != null);
    // return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}

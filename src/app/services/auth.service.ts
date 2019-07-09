import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string;

  constructor(
    private http:HttpClient
  ) { }


  registerUser(_newUser:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/users/register', _newUser, {headers});
  }

  signUser(_user:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/users/authenticate', _user, {headers});
  }

  getProfile():Observable<any>{
    this.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.token)
    return this.http.get('http://localhost:3000/users/profile', {headers});
  }

  loadToken(){
    this.token = localStorage.getItem('token');
  }

  tokenInvalid(){
    this.loadToken();
    if(this.token){
      return jwtHelper.isTokenExpired(this.token);
    }else{
      return true;
    }
    
  }

  logout(){
    localStorage.clear();
  }

  getUser(id):Observable<any>{
    this.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.post('http://localhost:3000/users/getUser', id, {headers})
  }
}

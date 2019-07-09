import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Conference } from '../components/conference';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


  getAllPapers(): Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.get('http://localhost:3000/conferences/listConferences')
  }

  addComment(_comment): Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    console.log(headers);
    return this.http.post('http://localhost:3000/papers/addComment', _comment, {headers})
  }

  getPaperById(_id): Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    console.log(headers);
    return this.http.post('http://localhost:3000/papers/getPaperById', _id, {headers})
  }

  getPaperByAuthor(): Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    console.log(headers);
    return this.http.get('http://localhost:3000/papers/getMyPapers', {headers})
  }

  uploadPaper(_paper):Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    return this.http.post('http://localhost:3000/papers/addPaper', _paper, {headers})
  }
}

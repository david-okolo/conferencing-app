import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Conference } from '../components/conference';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getConferenceById(conference): Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/conferences/getConference', conference, {headers})
  }


  getAllConferences(): Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.get('http://localhost:3000/conferences/listConferences')
  }

  startConference(newConference): Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    console.log(headers);
    return this.http.post('http://localhost:3000/conferences/addConference', newConference, {headers})
  }

  addToConference(conf): Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    return this.http.post('http://localhost:3000/conferences/addPaper', conf, {headers})
  }

  deletePaper(conf): Observable<any>{
    this.auth.loadToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer "+this.auth.token);
    return this.http.post('http://localhost:3000/papers/deletePaper', conf, {headers})
  }
}

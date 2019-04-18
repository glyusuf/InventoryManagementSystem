import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWroldService(){
     return this.http.get('http://localhost:8080/walton/helloworld',{responseType: 'text'});
  }
}

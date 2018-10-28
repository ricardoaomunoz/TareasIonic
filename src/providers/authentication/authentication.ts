import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  url
  headers

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationProvider Provider');
    this.url = localStorage.getItem('url');
    let jwt = localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Authorization' : 'Bearer' + jwt});
  }

  login(usuario){
    return this.http.post(this.url + 'usuario_token', {
      auth:usuario
    })

  }

}

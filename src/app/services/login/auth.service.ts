import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {booleanAttribute, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;
  roles: string[] = ['ADMIN', 'USER'];
  username : any;
  accessTokon ! : string;
  private url = 'http://localhost:8081/projet';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .toString();  // Convertit les paramètres en une chaîne encodée

    return this.http.post(this.url + '/login', body, { headers });
  }

  loadProfile(data:any){
    this.isAuthenticated = true;
    this.accessTokon = data['access_token'];
    let decodeJwt :any = jwtDecode(this.accessTokon);
    this.username = decodeJwt.sub;
    this.roles = decodeJwt.scope
    console.log(this.roles);

  }
}

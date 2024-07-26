import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppUser} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = 'http://localhost:8081/projet/AppUser';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: AppUser) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "/add-AppUser", user, {headers});
  }
}

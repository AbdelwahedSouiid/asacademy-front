import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppUser} from "../../model/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url + "/AppUser";

  constructor(private http: HttpClient) {
  }

  getUser(email: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<AppUser>(`${this.url}/retrieve-AppUser-BY-Email/${email}`, {headers});
  }

  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.url}/retrieve-all-Users`);
  }

  updateUser(user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.url}/modify-AppUser`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/remove-AppUser/${id}`);
  }

  getUserById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.url}/retrieve-AppUser/${id}`);
  }

}

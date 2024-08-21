import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppUser} from "../../model/user.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = environment.url;

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: AppUser): Observable<AppUser> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<AppUser>(this.url + "/AppUser/add-AppUser", user, {headers});
  }

  uploadImage(file: File, userId: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', this.url + '/upload/UserPhoto/' + userId, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Tag} from "../../model/tag.model";


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  url = environment.url + "/tag";

  getTags(): Observable<Tag[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Tag[]>(this.url + "/retrieve-all-Tag", {headers});
  }

  ajouterTag(Tag: Tag): Observable<Tag> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Tag>(this.url + "/add-Tag", Tag, {headers});
  }

  detail(id: string): Observable<any> {
    return this.http.get(`${this.url}/retrieve-Tag/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove-Tag/${id}`);
  }

  update(Tag: Tag): Observable<any> {
    return this.http.put(`${this.url}/modify-Tag`, Tag);
  }

  uploadImage(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', this.url + '/uploadImage/' + id, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }
}

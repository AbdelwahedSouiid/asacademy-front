import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../../model/blog.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {
  }

  url = environment.url + "/blog";


  getBlogs(skipAuth: boolean = true): Observable<Blog[]> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    if (skipAuth) {
      headers = headers.set('X-Skip-Auth', 'true');
    }

    return this.http.get<Blog[]>(`${this.url}/retrieve-all-Blog`, {headers});
  }


  ajouterBlog(blog: Blog): Observable<Blog> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Blog>(this.url + "/add-Blog", blog, {headers});
  }

  detail(id: string): Observable<any> {
    return this.http.get(`${this.url}/retrieve-Blog/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove-Blog/${id}`);
  }

  update(blog: Blog): Observable<any> {
    return this.http.put(`${this.url}/modify-Blog`, blog);
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

import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cour} from "../../model/cour.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(private http: HttpClient) {
  }

  url = environment.url + "/cour";

  getCours(): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set('X-Skip-Auth', 'true');
    return this.http.get(this.url + "/retrieve-all-Cours", {headers});
  }

  ajouterCour(cour: Cour): Observable<any> {

    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "/add-Cour", cour, {headers});
  }

  detail(id: string): Observable<any> {
    return this.http.get(`${this.url}/retrieve-Cour/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove-Cour/${id}`);
  }

  update(cour: Cour): Observable<any> {
    return this.http.put(`${this.url}/modify-Cour`, cour);
  }

  uploadImage(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', environment.url + '/upload/AfficheCour/' + id, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }

  uploadCourVideo(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', `${environment.url}/upload/CourVideo/${id}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }


  searchCours(params: { tag?: string; category?: string; name?: string; price?: string }): Observable<Cour[]> {
    return this.http.get<Cour[]>(`${this.url}/search`, {params});
  }

}

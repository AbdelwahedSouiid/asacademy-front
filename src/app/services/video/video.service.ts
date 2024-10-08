import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Video} from "../../model/video.model";
import {Cour} from "../../model/cour.model";


@Injectable({
  providedIn: 'root'
})
export class VideoService {


  constructor(private http: HttpClient) {
  }

  url = environment.url + "/video";

  getVideos(): Observable<Video[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json").set('X-Skip-Auth', 'true');
    ;
    return this.http.get<Video[]>(this.url + "/retrieve-all-Video", {headers});
  }

  ajouterVideo(video: Video): Observable<Video> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Video>(this.url + "/add-Video", video, {headers});
  }

  detail(id: string): Observable<any> {
    return this.http.get(`${this.url}/retrieve-Video/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove-Video/${id}`);
  }

  update(Video: Video): Observable<any> {
    return this.http.put(`${this.url}/modify-Video`, Video);
  }

  // uploadVideo method in Angular
  uploadVideo(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    console.log(file + id);

    const request = new HttpRequest('POST', `${environment.url}/upload/Video/${id}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }

  searchVideo(params: { titre?: string; category?: string }): Observable<Video[]> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set('X-Skip-Auth', 'true');
    ;

    // Construire les options de la requête, y compris les en-têtes et les paramètres
    const options = {
      headers: headers,
      params: params
    };

    // Envoyer la requête GET à l'URL spécifiée avec les options de recherche
    return this.http.get<Video[]>(`${this.url}/search`, options);
  }


}

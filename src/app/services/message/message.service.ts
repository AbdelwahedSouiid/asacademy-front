import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Message} from '../../model/message.model'; // Assuming message.model.ts contains the Message interface

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Base URL for the message API
  url = environment.url + "/message";

  constructor(private http: HttpClient) {
  }

  // Fetch all messages
  getMessages(): Observable<Message[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Message[]>(`${this.url}/retrieve-all-messages`, {headers});
  }

  // Add a new message
  addMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Message>(`${this.url}/add-message`, message, {headers});
  }

  // Fetch details of a specific message by ID
  getMessageById(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.url}/retrieve-message/${id}`);
  }

  // Delete a message by ID
  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove-message/${id}`);
  }

  // Update an existing message
  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.url}/modify-message`, message);
  }

  // Upload an attachment (if you want to add files to a message)
  uploadFile(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', `${this.url}/upload-file/${id}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }
}

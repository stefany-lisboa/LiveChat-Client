import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MessageDTO } from 'src/app/dtos/message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: MessageDTO[] = [];
  constructor(private httpClient: HttpClient) {}

  getMessagesFromChannel(id: string): Observable<MessageDTO[]> {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjIzMmUwMzMyMmQ3Y2I1YTk5NDg2MTgiLCJlbWFpbCI6InN0ZWZhbnkyMmxpc2JvYUBnbWFpbC5jb20iLCJuYW1lIjoiU3RlZmFueSIsImlhdCI6MTcxMzY3MzUyNiwiZXhwIjozODYxMTU3MTczfQ.wvVfFRCkxmYwMEledDMlxhowgubG0e4ppyF6FuBSCUc';
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.append('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('Authorization', token);
      const httpOptions = {
        headers: httpHeaders,
      };
      return this.httpClient
        .get<MessageDTO[]>(`http://localhost:3000/channel/${id}/messages`, httpOptions)
        .pipe(map((response: MessageDTO[]) => response));
    
  }
}

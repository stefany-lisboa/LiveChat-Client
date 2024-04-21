import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChannelDto } from '../dtos/channel.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable()
export class ChannelService {
  private channel$ = new BehaviorSubject<any>({});
  selectedChannel$ = this.channel$.asObservable();

  constructor(private httpClient: HttpClient) {}

  setChannel(channel: ChannelDto) {
    this.channel$.next(channel);
  }

  getChannels(): Observable<ChannelDto[]> {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjIzMmUwMzMyMmQ3Y2I1YTk5NDg2MTgiLCJlbWFpbCI6InN0ZWZhbnkyMmxpc2JvYUBnbWFpbC5jb20iLCJuYW1lIjoiU3RlZmFueSIsImlhdCI6MTcxMzY3MzUyNiwiZXhwIjozODYxMTU3MTczfQ.wvVfFRCkxmYwMEledDMlxhowgubG0e4ppyF6FuBSCUc';
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', token);
    const httpOptions = {
      headers: httpHeaders,
    };
    return this.httpClient
      .get<ChannelDto[]>('http://localhost:3000/channel', httpOptions)
      .pipe(map((response: ChannelDto[]) => response));
  }
}

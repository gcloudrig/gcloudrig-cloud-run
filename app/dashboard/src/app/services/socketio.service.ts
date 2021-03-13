import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  isConnected = false;
  socket: any;

  constructor(private auth: AuthService) { }

  connect() {
    this.socket = io({
      extraHeaders: { Authorization: `Bearer ${this.auth.getToken()}` }
    });
  
    this.socket.on('connect', () => {
      this.isConnected = true;
    });
    this.socket.on('disconnect', () => {
      this.isConnected = false;
    });
  }

  fromEvent(event: string): Observable<string> {
    return new Observable<string>((subscriber) => { 
      this.socket.on(event, (data: string) => {
        subscriber.next(data);
      });
    })
  }

}

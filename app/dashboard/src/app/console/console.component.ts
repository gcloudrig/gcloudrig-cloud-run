import { Component, OnInit } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { from, Observable } from "rxjs";
import {io} from 'socket.io-client';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
})
export class ConsoleComponent implements OnInit {
  constructor(private auth: AuthService) {}

  socket: any;
  processData: string[] = [];
  command: any;

  ngOnInit(): void {

    this.socket = io('/gcloudrig/socket.io', {
      extraHeaders: { Authorization: `Bearer ${this.auth.getToken}` }
    });

    this.fromEvent('process_data').subscribe(data => {
      this.processData.push(data);
    });

    this.command = this.fromEvent('command');
  }

  fromEvent(event: string): Observable<string> {
    return new Observable<string>((subscriber) => { 
      this.socket.on(event, (data: string) => {
        subscriber.next(data);
      });
    })
  }
}

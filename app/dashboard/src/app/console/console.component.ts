import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {io} from 'socket.io-client';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface LogItem {
  msg: string;
  type: string;
}
interface LogItems extends Array<LogItem>{}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
})
export class ConsoleComponent implements OnInit {
  constructor(private auth: AuthService, private http: HttpClient) {}

  socket: any;
  processData: LogItems = [];
  command: any;

  ngOnInit(): void {

    this.socket = io({
      extraHeaders: { Authorization: `Bearer ${this.auth.getToken()}` }
    });

    this.fromEvent('process_data').subscribe(data => {
      this.processData.push({msg: data, type: 'log'});
    });

    this.fromEvent('command').subscribe(data => {
      this.processData = [{msg: 'Command Start', type: 'success'}];
      this.command = data;
    });

    this.fromEvent('command_exit').subscribe(data => {
      this.processData.push({msg: 'Command Complete', type: 'danger'});
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

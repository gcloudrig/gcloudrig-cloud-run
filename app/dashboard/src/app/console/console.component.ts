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
  myDate: any;

  ngOnInit(): void {
    
    this.processData = JSON.parse(localStorage.getItem('last_console') || '[]');
    this.command = localStorage.getItem('last_command') || '';    

    this.socket = io({
      extraHeaders: { Authorization: `Bearer ${this.auth.getToken()}` }
    });

    this.fromEvent('process_data').subscribe(data => {
      this.processData.push({msg: data, type: 'log'});
      this.saveConsole();
    });

    this.fromEvent('command').subscribe(data => {
      this.processData = [{msg: 'Command Start', type: 'success'}];
      this.command = data;
      this.saveConsole();
    });

    this.fromEvent('command_exit').subscribe(data => {
      this.processData.push({msg: 'Command Complete', type: 'danger'});
      this.saveConsole();
    });
  }

  saveConsole() {
    localStorage.setItem('last_console', JSON.stringify(this.processData));
    localStorage.setItem('last_command', this.command);
  }

  clearConsole() {
    localStorage.setItem('last_console', '');
    localStorage.setItem('last_command', '');
    this.processData = [];
    this.command = '';
  }

  fromEvent(event: string): Observable<string> {
    return new Observable<string>((subscriber) => { 
      this.socket.on(event, (data: string) => {
        subscriber.next(data);
      });
    })
  }
}

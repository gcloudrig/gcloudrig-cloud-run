import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from '../services/socketio.service';

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
  constructor(private auth: AuthService, private http: HttpClient, private socket: SocketioService) {}

  processData: LogItems = [];
  command: any;
  myDate: any;

  ngOnInit(): void {
    
    this.processData = JSON.parse(localStorage.getItem('last_console') || '[]');
    this.command = localStorage.getItem('last_command') || '';    

    this.socket.fromEvent('process_data').subscribe(data => {
      this.processData.push({msg: data, type: 'log'});
      this.saveConsole();
    });

    this.socket.fromEvent('command').subscribe(data => {
      this.processData = [{msg: 'Command Start', type: 'success'}];
      this.command = data;
      this.saveConsole();
    });

    this.socket.fromEvent('command_exit').subscribe(data => {
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
}

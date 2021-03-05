import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  errorMsg = '';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
  }

  status() {
    this.http.get('/v1/run/status', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => this.handelError(error.status));
  }

  scaleUp() {
    this.http.get('/v1/run/up', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => this.handelError(error.status));
  }

  scaleDown() {
    this.http.get('/v1/run/down', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => this.handelError(error.status));
  }

  test() {
    this.http.get('/v1/run/test', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => this.handelError(error.status));
  }

  private handelError(status: number) {
    if (status == 409) {
      this.errorMsg = 'Command is already running...'
      setTimeout(() => {
        this.errorMsg = '';
      }, 4000);
    } else if(status != 200) {
      this.errorMsg = 'An error occured...'
      setTimeout(() => {
        this.errorMsg = '';
      }, 4000);
    }
  }
  
}

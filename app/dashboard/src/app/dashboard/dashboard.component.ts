import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
  }

  status() {
    this.http.get('/v1/run/status', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => console.log(error));
  }

  scaleUp() {
    this.http.get('/v1/run/up', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => console.log(error));
  }

  scaleDown() {
    this.http.get('/v1/run/down', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => console.log(error));
  }


  test() {
    this.http.get('/v1/run/test', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    }).subscribe(data => console.log(data), error => console.log(error));
  }

}

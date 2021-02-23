import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginFailed = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    const val = this.form.value;
   
    

    if (val.username && val.password) {
      this.auth.login(val.username, val.password).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        this.loginFailed = true;
        setTimeout(() => {
          this.loginFailed = false;
        }, 2000);
      });
    }
  }
}

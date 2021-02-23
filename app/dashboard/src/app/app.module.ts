import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogitemComponent } from './components/logitem/logitem.component';
import { ConsoleComponent } from './console/console.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export function tokenGetter() {
  return localStorage.getItem("auth_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogitemComponent,
    ConsoleComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

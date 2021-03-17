import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import { JwtGuard } from './guards/jwt.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'endpoint', component: EndpointComponent, canActivate: [JwtGuard]},
  { path: '**', component: DashboardComponent, canActivate: [JwtGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

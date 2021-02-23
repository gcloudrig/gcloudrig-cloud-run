import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const isLoggedIn = await this.auth.isLoggedIn();
      if (isLoggedIn) {
        console.log("jessica");
        
        return true;
      } else {
        console.log('yo');
        
        this.router.navigate(['/login']);
        return false;
      }


  }
  
}

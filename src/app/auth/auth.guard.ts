import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import {skipWhile, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1), // trick to mark that observable as completed
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}

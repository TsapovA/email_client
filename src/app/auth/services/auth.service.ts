import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basicUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(this.basicUrl + '/auth/username', {
      username
    });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(this.basicUrl + '/auth/signup', credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(this.basicUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post(this.basicUrl + '/auth/signout', {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(this.basicUrl + '/auth/signin', credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
}

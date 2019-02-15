import { Injectable, Inject, InjectionToken } from '@angular/core';
import { bindNodeCallback } from 'rxjs';
import * as auth0 from 'auth0-js';

import { environment } from '../../../environments/environment';

export const Auth0WebAuthService = new InjectionToken<auth0.WebAuth>('Auth0WebAuthService', {
  providedIn: 'root',
  factory: () =>
    new auth0.WebAuth({
      clientID: environment.auth0.clientId,
      domain: environment.auth0.domain,
      redirectUri: environment.auth0.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(Auth0WebAuthService) private auth0WebAuth) { }

  public parseHash$ = bindNodeCallback(this.auth0WebAuth.parseHash.bind(this.auth0WebAuth));
  public checkSession$ = bindNodeCallback(this.auth0WebAuth.checkSession.bind(this.auth0WebAuth));

  public signIn(): void {
    this.auth0WebAuth.authorize();
  }

  public signOut(): void {
    this.auth0WebAuth.logout({
      clientID: environment.auth0.clientId,
      returnTo: environment.auth0.logoutUrl
    });
  }
}

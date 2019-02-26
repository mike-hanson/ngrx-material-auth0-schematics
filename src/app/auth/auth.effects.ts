import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf, EMPTY, of, empty } from 'rxjs';
import { catchError, map, startWith, switchMap, tap, exhaustMap } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AuthService } from './services/auth.service';
import { SignInFailureDialogComponent } from './sign-in-failure-dialog/sign-in-failure-dialog.component';
import { State } from './auth.reducer';
import {
  SignInAction,
  AuthActionTypes,
  SignInCompleteAction,
  SignInSuccessAction,
  SignInFailureAction,
  SignOutAction,
  SignOutCompleteAction,
  RenewTokensAction,
  RenewTokensFailureAction,
  RenewTokensSuccessAction,
  SilentSignInAction,
  SilentSignInSuccessAction
} from './auth.actions';
import { Auth0ParseHashError } from 'auth0-js';
import { RenewTokensFailureDialogComponent } from './renew-tokens-failure-dialog/renew-tokens-failure-dialog.component';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private store: Store<State>,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  @Effect({ dispatch: false })
  signIn$: Observable<Action> = this.actions$.pipe(
    ofType<SignInAction>(AuthActionTypes.SignIn),
    tap(() => {
      return this.authService.signIn();
    })
  );

  @Effect()
  signInComplete$: Observable<Action> = this.actions$.pipe(
    ofType<SignInCompleteAction>(AuthActionTypes.SignInComplete),
    exhaustMap(() => {
      return this.authService.parseHash$().pipe(
        map((authResult: any) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.scheduleTokenRefresh(authResult);
            return new SignInSuccessAction(authResult);
          }
          return new SignInFailureAction('Sign In was not completed');
        }),
        catchError(error => {
          console.error(error);
          return of(new SignInFailureAction(error));
        })
      );
    }));

  @Effect({ dispatch: false })
  signInSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<SignInSuccessAction>(AuthActionTypes.SignInSuccess),
    tap(() => this.router.navigate(['home'])));

  @Effect({ dispatch: false })
  signInFailure$: Observable<Action> = this.actions$.pipe(
    ofType<SignInFailureAction>(AuthActionTypes.SignInFailure),
    tap((a: SignInFailureAction) => this.dialog.open(SignInFailureDialogComponent, {
      width: '350px',
      data: { error: (a.payload as Auth0ParseHashError).errorDescription || a.payload }
    })));

  @Effect({ dispatch: false })
  signOut$: Observable<Action> = this.actions$.pipe(
    ofType<SignOutAction>(AuthActionTypes.SignOut),
    tap(() => {
      return this.authService.signOut();
    })
  );

  @Effect({ dispatch: false })
  signOutComplete$: Observable<Action> = this.actions$.pipe(
    ofType<SignOutCompleteAction>(AuthActionTypes.SignOutComplete),
    tap(() => {
      this.router.navigate(['home']);
      setTimeout(() =>
        this.snackBar.open('Sign out successful', '', { duration: 3000 }), 200);
    }));

  @Effect()
  renewTokens$: Observable<Action> = this.actions$.pipe(
    ofType<RenewTokensAction>(AuthActionTypes.RenewTokens),
    exhaustMap(() => {
      return this.authService.checkSession$().pipe(
        map((authResult: any) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.scheduleTokenRefresh(authResult);
            return new RenewTokensSuccessAction(authResult);
          }
          return new RenewTokensFailureAction();
        }),
        catchError(error => {
          console.error(error);
          return of(new RenewTokensFailureAction());
        })
      );
    }));

  @Effect({ dispatch: false })
  renewTokensFailure$: Observable<Action> = this.actions$.pipe(
    ofType<RenewTokensFailureAction>(AuthActionTypes.RenewTokensFailure),
    tap(() => this.dialog.open(RenewTokensFailureDialogComponent, {
      width: '350px'
    })));

  @Effect()
  silentSignIn$: Observable<Action> = this.actions$.pipe(
    ofType<SilentSignInAction>(AuthActionTypes.SilentSignIn),
    exhaustMap(() => {
      return this.authService.checkSession$().pipe(
        map((authResult: any) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.scheduleTokenRefresh(authResult);
            return new SilentSignInSuccessAction(authResult);
          }
        }),
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      );
    }));

  private scheduleTokenRefresh(authResult) {
    setTimeout(() => {
      this.store.dispatch(new RenewTokensAction());
    }, environment.auth0.renewTokensInterval * 60000);
  }
}

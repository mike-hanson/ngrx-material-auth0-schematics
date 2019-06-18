import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../material/material.module';
import {
  SignInAction,
  SignInCompleteAction,
  SignInSuccessAction,
  SignInFailureAction,
  SignOutCompleteAction,
  SignOutAction,
  RenewTokensAction,
  RenewTokensSuccessAction,
  RenewTokensFailureAction,
  SilentSignInAction,
  SilentSignInSuccessAction
} from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import { State } from './auth.reducer';
import { SignInFailureDialogComponent } from '../sign-in-failure-dialog/sign-in-failure-dialog.component';
import { RenewTokensFailureDialogComponent } from '../renew-tokens-failure-dialog/renew-tokens-failure-dialog.component';
import { environment } from '../../../environments/environment';

@Component({
  template: '<div></div>'
})
class TestComponent {
}

describe('AuthEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let router: Router;
  let store: Store<State>;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  const routes = [{ path: 'home', component: TestComponent }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RouterTestingModule.withRoutes(routes),
        NoopAnimationsModule,
        MaterialModule,
      StoreModule.forRoot({})],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        AuthService
      ]
    });

    actions$ = new ReplaySubject(1);
    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    snackBar = TestBed.get(MatSnackBar);
  });

  it('should be defined', () => {
    expect(effects).toBeDefined();
  });

  it('should use AuthService on sign in', () => {
    const action = new SignInAction();
    spyOn(authService, 'signIn');

    actions$.next(action);

    effects.signIn$.subscribe(result => {
      expect(authService.signIn).toHaveBeenCalledTimes(1);
    });
  });

  it('should return success action when parsing valid hash from authentication', () => {
    const action = new SignInCompleteAction();
    const authResult = { accessToken: 'abc', idToken: 'def' };
    const completion = new SignInSuccessAction(authResult);
    const parseHashObservable = new ReplaySubject<any>(1);
    const parseHash$ = (args: any[]) => parseHashObservable;
    authService.parseHash$ = parseHash$;

    parseHashObservable.next(authResult);
    actions$.next(action);

    effects.signInComplete$.subscribe(result => {
      expect(result).toEqual(completion);
    });

  });

  it('should return failure action when parsing hash from authentication throws error', () => {
    const error = { error: '', description: '', errorDescription: '' };
    const action = new SignInCompleteAction();
    const authResult = { accessToken: 'abc', idToken: 'def' };
    const completion = new SignInFailureAction(error);
    const parseHashObservable = new ReplaySubject<any>(1);
    const parseHash$ = (args: any[]) => parseHashObservable;
    authService.parseHash$ = parseHash$;

    parseHashObservable.error(error);
    actions$.next(action);

    effects.signInComplete$.subscribe(result => {
      expect(result).toEqual(completion);
    });

  });

  it('should schedule token refresh when parsing valid hash from authentication', () => {
    const action = new SignInCompleteAction();
    const authResult = { accessToken: 'abc', idToken: 'def', expiresIn: 7200 };
    const completion = new SignInSuccessAction(authResult);
    const parseHashObservable = new ReplaySubject<any>(1);
    const parseHash$ = (args: any[]) => parseHashObservable;
    authService.parseHash$ = parseHash$;

    spyOn(window, 'setTimeout');
    parseHashObservable.next(authResult);
    actions$.next(action);

    effects.signInComplete$.subscribe(result => {
      expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), environment.auth0.renewTokensInterval * 60000);
    });
  });

  it('should dispatch action when scheduled timeout complete', fakeAsync(() => {
    const action = new SignInCompleteAction();
    const authResult = { accessToken: 'abc', idToken: 'def', expiresIn: 6 };
    const completion = new SignInSuccessAction(authResult);
    const parseHashObservable = new ReplaySubject<any>(1);
    const parseHash$ = (args: any[]) => parseHashObservable;
    authService.parseHash$ = parseHash$;
    environment.auth0.renewTokensInterval = 1;

    spyOn(store, 'dispatch');
    parseHashObservable.next(authResult);
    actions$.next(action);

    effects.signInComplete$.subscribe(result => {
        tick(60001);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RenewTokensAction));
    });
  }));

  it('should return success action when parsing valid hash from token renewal', () => {
    const action = new RenewTokensAction();
    const authResult = { accessToken: 'abc', idToken: 'def' };
    const completion = new RenewTokensSuccessAction(authResult);
    const checkSessionObservable = new ReplaySubject<any>(1);
    const checkSession$ = (args: any[]) => checkSessionObservable;
    authService.checkSessionObservable$ = checkSession$;

    checkSessionObservable.next(authResult);
    actions$.next(action);

    effects.renewTokens$.subscribe(result => {
      expect(result).toEqual(completion);
    });
  });

  it('should return failure action when parsing hash from token renewal throws error', () => {
    const error = { error: '', description: '', errorDescription: '' };
    const action = new RenewTokensAction();
    const authResult = { accessToken: 'abc', idToken: 'def' };
    const completion = new RenewTokensFailureAction();
    const checkSessionObservable = new ReplaySubject<any>(1);
    const checkSession$ = (args: any[]) => checkSessionObservable;
    authService.checkSessionObservable$ = checkSession$;

    checkSessionObservable.error(error);
    actions$.next(action);

    effects.renewTokens$.subscribe(result => {
      expect(result).toEqual(completion);
    });

  });

  it('should use Router to navigate to Home on sign in success', () => {
    spyOn(router, 'navigate');
    const action = new SignInSuccessAction({});

    actions$.next(action);

    effects.signInSuccess$.subscribe(result => {
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });
  });

  it('should use auth service on sign out', () => {
    const action = new SignOutAction();
    spyOn(authService, 'signOut');

    actions$.next(action);

    effects.signOut$.subscribe(result => {
      expect(authService.signOut).toHaveBeenCalledTimes(1);
    });
  });

  it('should use router to navigate to home on sign out complete', () => {
    const action = new SignOutCompleteAction();
    spyOn(router, 'navigate');

    actions$.next(action);

    effects.signOutComplete$.subscribe(result => {
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });
  });

  it('should show snack bar message on sign out complete', fakeAsync(() => {
    const action = new SignOutCompleteAction();
    spyOn(snackBar, 'open');

    actions$.next(action);

    effects.signOutComplete$.subscribe(result => {
      tick(201);
      expect(snackBar.open).toHaveBeenCalledWith('Sign out successful', '', { duration: 3000 });
    });
  }));

  it('should show error dialog on sign in failure', () => {
    const error = { error: '', description: '', errorDescription: 'some error' };
    const action = new SignInFailureAction(error);
    spyOn(dialog, 'open');


    actions$.next(action);

    effects.signInFailure$.subscribe(result => {
      expect(dialog.open).toHaveBeenCalledWith(SignInFailureDialogComponent, {
        width: '350px',
        data: { error: error.errorDescription }
      });
    });
  });

  it('should show error dialog on renew tokens failure', () => {
    const action = new RenewTokensFailureAction();
    spyOn(dialog, 'open');


    actions$.next(action);

    effects.renewTokensFailure$.subscribe(result => {
      expect(dialog.open).toHaveBeenCalledWith(RenewTokensFailureDialogComponent, {
        width: '350px'
      });
    });
  });

  it('should return success action when parsing valid hash from silent authentication', () => {
    const action = new SilentSignInAction();
    const authResult = { accessToken: 'abc', idToken: 'def' };
    const completion = new SilentSignInSuccessAction(authResult);
    const checkSessionObservable = new ReplaySubject<any>(1);
    const checkSession$ = (args: any[]) => checkSessionObservable;
    authService.checkSessionObservable$ = checkSession$;

    checkSessionObservable.next(authResult);
    actions$.next(action);

    effects.silentSignIn$.subscribe(result => {
      expect(result).toEqual(completion);
    });
  });

});

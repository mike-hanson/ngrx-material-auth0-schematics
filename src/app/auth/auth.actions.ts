import { Action } from '@ngrx/store';
import { Auth0ParseHashError, Auth0DecodedHash } from 'auth0-js';

export enum AuthActionTypes {
  SignIn = '[Auth] - Sign In',
  SignInComplete = '[Auth] - Sign In Complete',
  SignInSuccess = '[Auth] - Sign In Success',
  SignInFailure = '[Auth] - Sign In Failure',
  SignOut = '[Auth] - Sign Out',
  SignOutComplete = '[Auth] - Sign Out Complete',
  RenewTokens = '[Auth] = Renew Tokens',
  RenewTokensSuccess = '[Auth] - Renew Tokens Success',
  RenewTokensFailure = '[Auth] - Renew Tokens Failure',
  SilentSignIn = '[Auth] - Silent Sign In',
  SilentSignInSuccess = '[Auth] - Silent Sign In Success'
}

export class SignInAction implements Action {
  type: string = AuthActionTypes.SignIn;
}

export class SignInCompleteAction implements Action {
  readonly type: string = AuthActionTypes.SignInComplete;
}

export class SignInSuccessAction implements Action {
  type: string = AuthActionTypes.SignInSuccess;
  constructor(readonly payload: Auth0DecodedHash) { }
}

export class SignInFailureAction implements Action {
  readonly type: string = AuthActionTypes.SignInFailure;
  constructor(readonly payload: Auth0ParseHashError | string) { }
}

export class SignOutAction implements Action {
  readonly type: string = AuthActionTypes.SignOut;
}

export class SignOutCompleteAction implements Action {
  readonly type: string = AuthActionTypes.SignOutComplete;
}

export class RenewTokensAction implements Action {
  readonly type: string = AuthActionTypes.RenewTokens;
}

export class RenewTokensSuccessAction implements Action {
  readonly type: string = AuthActionTypes.RenewTokensSuccess;
  constructor(readonly payload: Auth0DecodedHash) { }
}

export class RenewTokensFailureAction implements Action {
  readonly type: string = AuthActionTypes.RenewTokensFailure;
}

export class SilentSignInAction implements Action {
  readonly type: string = AuthActionTypes.SilentSignIn;
}

export class SilentSignInSuccessAction implements Action {
  type: string = AuthActionTypes.SilentSignInSuccess;
  constructor(readonly payload: Auth0DecodedHash) { }
}

export type AuthActions =
  | SignInAction
  | SignInCompleteAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignOutCompleteAction
  | RenewTokensAction
  | RenewTokensSuccessAction
  | RenewTokensFailureAction
  | SilentSignInAction
  | SilentSignInSuccessAction;

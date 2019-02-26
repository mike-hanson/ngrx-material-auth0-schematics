import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { Auth0DecodedHash } from 'auth0-js';

import { Auth0WebAuthService } from './services/auth.service';
import {
  AuthActions,
  AuthActionTypes,
  SignInSuccessAction,
  RenewTokensSuccessAction,
  SilentSignInSuccessAction
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  accessToken?: string;
  idToken?: any;
  expiresAt?: Date;
  userId?: string;
  email?: string;
  givenName?: string;
  familyName?: string;
  pictureUrl?: string;
}

export const initialState: State = {
  isAuthenticated: false,
  accessToken: '',
  idToken: '',
  expiresAt: null,
  userId: '',
  email: '',
  givenName: '',
  familyName: '',
  pictureUrl: ''
};

export function reducer(state = initialState, action: AuthActions): State {

  function mapAuthPayloadToState(payload: Auth0DecodedHash) {
    return {
      ...state,
      isAuthenticated: true,
      accessToken: payload.accessToken,
      idToken: payload.idToken,
      expiresAt: new Date((new Date()).getTime() + (payload.expiresIn * 1000)),
      userId: payload.idTokenPayload.aud,
      email: payload.idTokenPayload.email,
      givenName: payload.idTokenPayload.given_name,
      familyName: payload.idTokenPayload.family_name,
      pictureUrl: payload.idTokenPayload.picture
    };
  }

  switch (action.type) {

    case AuthActionTypes.SignInSuccess:
      const signInSuccessAction = action as SignInSuccessAction;
      return mapAuthPayloadToState(signInSuccessAction.payload);

    case AuthActionTypes.SignInFailure:
      return Object.assign({}, initialState);

    case AuthActionTypes.SignOutComplete:
      return Object.assign({}, initialState);

    case AuthActionTypes.RenewTokensSuccess:
      const renewTokensSuccessAction = action as RenewTokensSuccessAction;
      return mapAuthPayloadToState(renewTokensSuccessAction.payload);

    case AuthActionTypes.SilentSignInSuccess:
      const silentSignSuccessAction = action as SilentSignInSuccessAction;
      return mapAuthPayloadToState(silentSignSuccessAction.payload);

    default:
      return state;
  }
}

export const getAuthFeature = createFeatureSelector<State>('auth');

export const getIsAuthenticated = createSelector(getAuthFeature, (s: State) => s.isAuthenticated);

export const getFullName = createSelector(getAuthFeature, (s: State) => s.givenName + ' ' + s.familyName);

export const getPicture = createSelector(getAuthFeature, (s: State) => s.pictureUrl);



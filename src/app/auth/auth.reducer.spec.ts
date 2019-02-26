import { Auth0DecodedHash } from 'auth0-js';

import {
  reducer,
  initialState,
  State,
  getAuthFeature,
  getIsAuthenticated,
  getFullName,
  getPicture
} from './auth.reducer';
import {
  SignInSuccessAction,
  SignOutCompleteAction,
  SignInFailureAction,
  SilentSignInSuccessAction
} from './auth.actions';
import { EmailValidator } from '@angular/forms';
import { stat } from 'fs';
import * as auth0 from 'auth0-js';

describe('Auth Reducer', () => {
  const parsedHash: Auth0DecodedHash = {
    accessToken: 'abcd',
    idToken: 'def',
    expiresIn: 200,
    idTokenPayload: {
      aud: 'abc123',
      email: 'someone@somewhere.com',
      given_name: 'Fred',
      family_name: 'Flintstone',
      picture: 'somepictureurl'
    }
  };

  const authenticatedState: State = {
    isAuthenticated: true,
    accessToken: parsedHash.accessToken,
    idToken: parsedHash.idToken,
    userId: parsedHash.idTokenPayload.aud,
    email: parsedHash.idTokenPayload.email,
    givenName: parsedHash.idTokenPayload.given_name,
    familyName: parsedHash.idTokenPayload.family_name,
    pictureUrl: parsedHash.idTokenPayload.picture
  };

  it('Should return correct state for SignInSuccess action', () => {

    const expectedMinDate = new Date((new Date()).getTime() + ((parsedHash.expiresIn - 1) * 60000));

    const result = reducer({ isAuthenticated: false }, new SignInSuccessAction(parsedHash));

    expect(result).toEqual(jasmine.objectContaining(authenticatedState));
    expect(result.expiresAt.valueOf()).toBeGreaterThanOrEqual(expectedMinDate.valueOf());
  });

  it('Should return correct state for SignInFailure action', () => {
    const result = reducer(authenticatedState, new SignInFailureAction('some error'));

    expect(result).toEqual(initialState);
  });

  it('Should return correct state for SignOutSuccess action', () => {
    const result = reducer(authenticatedState, new SignOutCompleteAction());

    expect(result).toEqual(initialState);
  });

  it('Should return correct state for SilentSignInSuccess action', () => {

    const expectedMinDate = new Date((new Date()).getTime() + ((parsedHash.expiresIn - 1) * 60000));

    const result = reducer({ isAuthenticated: false }, new SilentSignInSuccessAction(parsedHash));

    expect(result).toEqual(jasmine.objectContaining(authenticatedState));
    expect(result.expiresAt.valueOf()).toBeGreaterThanOrEqual(expectedMinDate.valueOf());
  });

  it('Should return current state if not handled', () => {
    const state = initialState;

    const result = reducer(state, { type: 'nothing' });

    expect(result).toBe(state);
  });

  describe('selectors', () => {
    it('Should provide selector to return auth feature', () => {
      const state = {
        somethingElse: true,
        auth: authenticatedState
      };

      const result = getAuthFeature(state);

      expect(result).toEqual(state.auth);
    });

    it('Should provide selector to identify whether the user is authenticated', () => {
      const state = {
        somethingElse: true,
        auth: authenticatedState
      };

      const result = getIsAuthenticated(state);

      expect(result).toBe(state.auth.isAuthenticated);
    });

    it('Should provide selector to get the users full name', () => {
      const state = {
        somethingElse: true,
        auth: authenticatedState
      };

      const result = getFullName(state);

      expect(result).toEqual(authenticatedState.givenName + ' ' + authenticatedState.familyName);
    });

    it('Should provide selector to get the users picture', () => {
      const state = {
        somethingElse: true,
        auth: authenticatedState
      };

      const result = getPicture(state);

      expect(result).toEqual(authenticatedState.pictureUrl);
    });
  });
});

import { Auth0DecodedHash } from 'auth0-js';

import {
  reducer,
  initialState,
  State
} from './auth.reducer';
import {
  SignInSuccessAction,
  SignOutCompleteAction,
  SignInFailureAction,
  SilentSignInSuccessAction
} from './auth.actions';

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

  it('should return correct state for SignInSuccess action', () => {

    const expectedMinDate = new Date((new Date()).getTime() + ((parsedHash.expiresIn - 1) * 60000));

    const result = reducer({ isAuthenticated: false }, new SignInSuccessAction(parsedHash));

    expect(result).toEqual(jasmine.objectContaining(authenticatedState));
    expect(result.expiresAt.valueOf()).toBeGreaterThanOrEqual(expectedMinDate.valueOf());
  });

  it('should return correct state for SignInFailure action', () => {
    const result = reducer(authenticatedState, new SignInFailureAction('some error'));

    expect(result).toEqual(initialState);
  });

  it('should return correct state for SignOutSuccess action', () => {
    const result = reducer(authenticatedState, new SignOutCompleteAction());

    expect(result).toEqual(initialState);
  });

  it('should return correct state for SilentSignInSuccess action', () => {

    const expectedMinDate = new Date((new Date()).getTime() + ((parsedHash.expiresIn - 1) * 60000));

    const result = reducer({ isAuthenticated: false }, new SilentSignInSuccessAction(parsedHash));

    expect(result).toEqual(jasmine.objectContaining(authenticatedState));
    expect(result.expiresAt.valueOf()).toBeGreaterThanOrEqual(expectedMinDate.valueOf());
  });

  it('should return current state if not handled', () => {
    const state = initialState;

    const result = reducer(state, { type: 'nothing' });

    expect(result).toBe(state);
  });
});

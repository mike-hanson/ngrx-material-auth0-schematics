
// tslint:disable: no-string-literal
import {
  AuthActionTypes,
  SignInAction,
  SignInCompleteAction,
  SignInSuccessAction,
  SignInFailureAction,
  SignOutAction,
  SignOutCompleteAction,
  RenewTokensAction,
  RenewTokensSuccessAction,
  RenewTokensFailureAction
} from './auth.actions';
import { Action } from '@ngrx/store';

describe('auth.actions', () => {
  let action: Action;
  const payload: any = {};

  it('Should define enum with correct set of actions', () => {
    expect(AuthActionTypes.SignIn).toBeDefined();
    expect(AuthActionTypes.SignInComplete).toBeDefined();
    expect(AuthActionTypes.SignInSuccess).toBeDefined();
    expect(AuthActionTypes.SignInFailure).toBeDefined();
    expect(AuthActionTypes.SignOut).toBeDefined();
    expect(AuthActionTypes.SignOutComplete).toBeDefined();
    expect(AuthActionTypes.RenewTokens).toBeDefined();
    expect(AuthActionTypes.RenewTokensSuccess).toBeDefined();
    expect(AuthActionTypes.RenewTokensFailure).toBeDefined();
  });

  describe('SignInAction', () => {
    beforeEach(() => {
      action = new SignInAction();
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignIn);
    });
  });

  describe('SignInCompleteAction', () => {
    beforeEach(() => {
      action = new SignInCompleteAction();
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignInComplete);
    });
  });

  describe('SignInSuccessAction', () => {
    beforeEach(() => {
      action = new SignInSuccessAction(payload);
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignInSuccess);
    });

    it('Should have payload', () => {
      expect(action['payload']).toBe(payload);
    });
  });

  describe('SignInFailureAction', () => {
    beforeEach(() => {
      action = new SignInFailureAction(payload);
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignInFailure);
    });

    it('Should have payload', () => {
      expect(action['payload']).toBe(payload);
    });
  });

  describe('SignOutAction', () => {
    beforeEach(() => {
      action = new SignOutAction();
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignOut);
    });
  });

  describe('SignOutCompleteAction', () => {
    beforeEach(() => {
      action = new SignOutCompleteAction();
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignOutComplete);
    });
  });

  describe('RenewTokensAction', () => {
    beforeEach(() => {
      action = new RenewTokensAction();
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.RenewTokens);
    });
  });

  describe('RenewTokensSuccesAction', () => {
    beforeEach(() => {
      action = new RenewTokensSuccessAction(payload);
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.RenewTokensSuccess);
    });

    it('Should have payload', () => {
      expect(action['payload']).toBe(payload);
    });
  });

  describe('RenewTokensFailureAction', () => {
    beforeEach(() => {
      action = new RenewTokensFailureAction();
    });

    it('Should be defined', () => {
      expect(action).toBeDefined();
    });

    it('Should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.RenewTokensFailure);
    });
  });

});


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

  it('should define enum with correct set of actions', () => {
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

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignIn);
    });
  });

  describe('SignInCompleteAction', () => {
    beforeEach(() => {
      action = new SignInCompleteAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignInComplete);
    });
  });

  describe('SignInSuccessAction', () => {
    beforeEach(() => {
      action = new SignInSuccessAction(payload);
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignInSuccess);
    });

    it('should have payload', () => {
      expect(action['payload']).toBe(payload);
    });
  });

  describe('SignInFailureAction', () => {
    beforeEach(() => {
      action = new SignInFailureAction(payload);
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignInFailure);
    });

    it('should have payload', () => {
      expect(action['payload']).toBe(payload);
    });
  });

  describe('SignOutAction', () => {
    beforeEach(() => {
      action = new SignOutAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignOut);
    });
  });

  describe('SignOutCompleteAction', () => {
    beforeEach(() => {
      action = new SignOutCompleteAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.SignOutComplete);
    });
  });

  describe('RenewTokensAction', () => {
    beforeEach(() => {
      action = new RenewTokensAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.RenewTokens);
    });
  });

  describe('RenewTokensSuccesAction', () => {
    beforeEach(() => {
      action = new RenewTokensSuccessAction(payload);
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.RenewTokensSuccess);
    });

    it('should have payload', () => {
      expect(action['payload']).toBe(payload);
    });
  });

  describe('RenewTokensFailureAction', () => {
    beforeEach(() => {
      action = new RenewTokensFailureAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(AuthActionTypes.RenewTokensFailure);
    });
  });

});

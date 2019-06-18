import { BreakpointState } from '@angular/cdk/layout';

import {
  CoreActionTypes,
  ToggleSideNavAction,
  BrowserBreakPointChangedAction,
  SmallerDeviceBreakActivatedAction,
  LargerDeviceBreakActivatedAction
} from './core.actions';

describe('core.actions', () => {
  let action: any;

  it('should define enum with correct set of actions', () => {
    expect(CoreActionTypes.ToggleSideNav).toBe('[Shell] Toggle Side Nav');
    expect(CoreActionTypes.BrowserBreakPointChanged).toBe('[Shell] Browser Break Point Changed');
    expect(CoreActionTypes.SmallerDeviceBreakActivated).toBe('[Shell] Smaller Device Break Activated');
    expect(CoreActionTypes.LargerDeviceBreakActivated).toBe('[Shell] Larger Device Break Activated');
  });

  describe('ToggleSideNavAction', () => {
    beforeEach(() => {
      action = new ToggleSideNavAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(CoreActionTypes.ToggleSideNav);
    });
  });

  describe('BrowserBreakPointChangedAction', () => {
    let payload: BreakpointState;

    beforeEach(() => {
      payload = {matches: true, breakpoints: {key: true}};
      action = new BrowserBreakPointChangedAction(payload);
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(CoreActionTypes.BrowserBreakPointChanged);
    });

    it('should have correct payload', () => {
      expect(action.payload).toBe(payload);
    });
  });

  describe('SmallerDeviceBreakActivatedAction', () => {
    beforeEach(() => {
      action = new SmallerDeviceBreakActivatedAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(CoreActionTypes.SmallerDeviceBreakActivated);
    });
  });

  describe('LargerDeviceBreakActivatedAction', () => {
    beforeEach(() => {
      action = new LargerDeviceBreakActivatedAction();
    });

    it('should be defined', () => {
      expect(action).toBeDefined();
    });

    it('should have correct type', () => {
      expect(action.type).toEqual(CoreActionTypes.LargerDeviceBreakActivated);
    });
  });
});

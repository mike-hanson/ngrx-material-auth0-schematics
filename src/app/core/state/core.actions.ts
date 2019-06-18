import { Action } from '@ngrx/store';
import { BreakpointState } from '@angular/cdk/layout';

export enum CoreActionTypes {
  ToggleSideNav = '[Shell] Toggle Side Nav',
  BrowserBreakPointChanged = '[Shell] Browser Break Point Changeds',
  SmallerDeviceBreakActivated = '[Shell] Smaller Device Break Activated',
  LargerDeviceBreakActivated = '[Shell] Larger Device Break Activated'
}

export class ToggleSideNavAction implements Action {
  readonly type = CoreActionTypes.ToggleSideNav;
}

export class BrowserBreakPointChangedAction implements Action {
  readonly type = CoreActionTypes.BrowserBreakPointChanged;
  constructor(readonly payload: BreakpointState) { }
}

export class SmallerDeviceBreakActivatedAction implements Action {
  readonly type = CoreActionTypes.SmallerDeviceBreakActivated;
}

export class LargerDeviceBreakActivatedAction implements Action {
  readonly type = CoreActionTypes.LargerDeviceBreakActivated;
}

export type CoreActions = ToggleSideNavAction
  | BrowserBreakPointChangedAction
  | SmallerDeviceBreakActivatedAction
  | LargerDeviceBreakActivatedAction;

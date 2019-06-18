import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { tap, switchMap, catchError, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';

import { State } from './core.reducer';
import {
  BrowserBreakPointChangedAction,
  CoreActionTypes,
  SmallerDeviceBreakActivatedAction,
  LargerDeviceBreakActivatedAction
} from './core.actions';

@Injectable()
export class CoreEffects {

  constructor(private actions$: Actions, private breakPointObserver: BreakpointObserver, private store: Store<State>) {
    this.breakPointObserver.observe(['(min-width: 600px)'])
    .subscribe((state: BreakpointState) => {
        this.store.dispatch(new BrowserBreakPointChangedAction(state));
      });
  }

  @Effect()
  breakPointChanged$ = this.actions$.pipe(
    ofType<BrowserBreakPointChangedAction>(CoreActionTypes.BrowserBreakPointChanged),
    map(a =>  a.payload.matches ? new LargerDeviceBreakActivatedAction() : new SmallerDeviceBreakActivatedAction()),
    catchError(e => {
      console.log(e);
      return EMPTY;
    })
  );
}

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { BrowserBreakPointChangedAction, LargerDeviceBreakActivatedAction } from './core.actions';
import { BreakpointState } from '@angular/cdk/layout';

import { CoreEffects } from './core.effects';

describe('CoreEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: CoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [
        CoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    actions$ = new ReplaySubject(1);
    effects = TestBed.get(CoreEffects);
  });

  it('should compile', () => {
    expect(effects).toBeTruthy();
  });

  it('should return larger device break activated action', () => {
    const payload: BreakpointState = {matches: true, breakpoints: {key: false}};
    const action = new BrowserBreakPointChangedAction(payload);
    const completion = new LargerDeviceBreakActivatedAction();
    actions$.next(action);

    effects.breakPointChanged$.subscribe(result => {
      expect(result).toEqual(completion);
    });

  });
});

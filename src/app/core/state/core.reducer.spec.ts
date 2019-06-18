import { reducer, initialState } from './core.reducer';
import {
  ToggleSideNavAction
} from './core.actions';

describe('Core Reducer', () => {

  it('should default to original state', () => {
    const action = {} as any;

    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should handle toggle side nav action', () => {
    const result = reducer(initialState, new ToggleSideNavAction());

    expect(result.showSideNav).toBe(false);
  });
});

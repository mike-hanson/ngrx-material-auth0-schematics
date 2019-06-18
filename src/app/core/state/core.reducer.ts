
import { CoreActions, CoreActionTypes } from './core.actions';

export interface State {
  showSideNav: boolean;
  sideNavMode: string;
  isFixedInViewPort: boolean;
}

export const initialState: State = {
  showSideNav: true,
  sideNavMode: 'side',
  isFixedInViewPort: false
};

export function reducer(state = initialState, action: CoreActions): State {
  switch (action.type) {

    case CoreActionTypes.ToggleSideNav:
      return {
        ...state,
        showSideNav: !state.showSideNav
      };

    case CoreActionTypes.SmallerDeviceBreakActivated:
      return {
        ...state,
        sideNavMode: 'over',
        showSideNav: false,
        isFixedInViewPort: true
      };

    case CoreActionTypes.LargerDeviceBreakActivated:
      return {
        ...state,
        sideNavMode: 'side',
        showSideNav: true,
        isFixedInViewPort: false
      };

    default:
      return state;
  }
}

import {
    createFeatureSelector,
    createSelector
  } from '@ngrx/store';

import { State } from './core.reducer';

export const getShellFeature = createFeatureSelector<State>('shell');

export const getShowSideNav = createSelector(getShellFeature, (state: State) => state.showSideNav);
export const getSideNavMode = createSelector(getShellFeature, (state: State) => state.sideNavMode);
export const getIsFixedInViewPort = createSelector(getShellFeature, (state: State) => state.isFixedInViewPort);

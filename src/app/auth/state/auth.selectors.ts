import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { State } from './auth.reducer';

export const getAuthFeature = createFeatureSelector<State>('auth');

export const getIsAuthenticated = createSelector(getAuthFeature, (s: State) => s.isAuthenticated);

export const getFullName = createSelector(getAuthFeature, (s: State) => s.givenName + ' ' + s.familyName);

export const getPicture = createSelector(getAuthFeature, (s: State) => s.pictureUrl);



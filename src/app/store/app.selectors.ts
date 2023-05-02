import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const getUsers = createSelector(
  selectAppState,
  (state: AppState) => state.users
);

export const getAccounts = createSelector(
  selectAppState,
  (state: AppState) => state.accounts
);

export const getLoadingError = createSelector(
  selectAppState,
  (state) => state.loadError
);

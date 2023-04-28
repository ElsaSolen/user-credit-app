import { Action, createReducer, on } from '@ngrx/store';
import { setUserInfo, setAccountInfo } from './app.actions';
import { AppState } from './app.state';

export const initialState: AppState = { users: [], accounts: [] };

const reducer = createReducer(
  initialState,
  on(setUserInfo, (state, { users }) => ({
    ...state,
    users,
  })),
  on(setAccountInfo, (state, { accounts }) => ({
    ...state,
    accounts,
  }))
);
export function appReducer(state: AppState, action: Action): AppState {
  return reducer(state, action);
}

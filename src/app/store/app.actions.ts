import { createAction, props } from '@ngrx/store';
import { Account } from '../interfaces/account.interface';
import { User } from '../interfaces/user.interface';

export const getUserInfo = createAction(
  '[UserInfo] Get User Info',
  props<{ user: string }>()
);

export const setUserInfo = createAction(
  '[UserInfo] Set User Info',
  props<{ users: User[] }>()
);

export const getAccountInfo = createAction('[AccountInfo] Get Account Info');

export const setAccountInfo = createAction(
  '[AccountInfo] Set Account Info',
  props<{ accounts: Account[] }>()
);

//******* ERROR ********/
export const setLoadingError = createAction(
  '[Error] Get Info Error',
  props<{ loadError: boolean }>()
);

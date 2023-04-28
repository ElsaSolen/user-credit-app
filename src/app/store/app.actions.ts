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

export const getUserInfoError = createAction('[UserInfo] Error User Info');

export const getAccountInfo = createAction('[AccountInfo] Get Account Info');

export const setAccountInfo = createAction(
  '[AccountInfo] Set Account Info',
  props<{ accounts: Account[] }>()
);

export const getAccountInfoError = createAction(
  '[AccountInfo] Error Account Info',
  props<{ message: string }>()
);

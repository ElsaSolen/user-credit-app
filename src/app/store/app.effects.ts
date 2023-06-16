import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import * as StoreActions from './app.actions';
import { UsersService } from '../services/users.service';
import { AccountsService } from '../services/accounts.service';
import { Store } from '@ngrx/store';
import { setError } from './app.actions';
import { Account, User } from '../interfaces/index';
import { Observable } from 'rxjs';

@Injectable()
export class AppEffects {
  userFetching$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getUserInfo),
      mergeMap((action) => this.userService.getUsers(action.user)),
      catchError((error) => {
        this.store.dispatch(setError({ error: true }));
        return throwError(error);
      }),
      map((rawData) => {
        if (rawData) {
          return StoreActions.setUserInfo({
            users: rawData as User[],
          });
        } else {
          return StoreActions.setLoader({
            loader: true,
          });
        }
      })
    )
  );

  accountsFetching$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getUserInfo),
      mergeMap(() => this.accountsService.getAccounts()),
      catchError((error) => {
        this.store.dispatch(setError({ error: true }));
        return throwError(error);
      }),
      map((rawData) => {
        if (rawData) {
          return StoreActions.setAccountInfo({
            accounts: rawData as Account[],
          });
        } else {
          return StoreActions.setLoader({
            loader: true,
          });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private accountsService: AccountsService,
    private store: Store
  ) {}
}

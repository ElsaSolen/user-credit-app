import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as StoreActions from './app.actions';
import { UsersService } from '../services/users.service';
import { AccountsService } from '../services/accounts.service';
import { Store } from '@ngrx/store';
import { setLoadingError } from './app.actions';

@Injectable()
export class AppEffects {
  userFetching$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getUserInfo),
      map((action) => this.userService.getUsers(action.user)),
      catchError((error) => {
        this.store.dispatch(setLoadingError({ loadError: true }));
        return throwError(error);
      }),
      map((rawData) => {
        return StoreActions.setUserInfo({
          users: rawData,
        });
      })
    )
  );

  accountsFetching$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getUserInfo),
      map(() => this.accountsService.getAccounts()),
      catchError((error) => {
        this.store.dispatch(setLoadingError({ loadError: true }));
        return throwError(error);
      }),
      map((rawData) => {
        return StoreActions.setAccountInfo({
          accounts: rawData,
        });
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

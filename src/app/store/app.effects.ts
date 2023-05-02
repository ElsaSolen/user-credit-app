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

//what if one preceeds the other.
//make 2 different error handlers and test on one true.
//Leave it on true on Error and set it to false on the concatMethod.

@Injectable()
export class AppEffects {
  userFetching$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getUserInfo),
      map((action) => this.userService.getUsers(action.user)),
      catchError((error) => {
        //console.log('dispatch error users');
        this.store.dispatch(setLoadingError({ loadError: true }));
        return throwError(error);
      }),
      map((rawData) => {
        //console.log('Users effect', rawData);
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
      // add alert or action before throwError
      catchError((error) => {
        //console.log('dispatch error Accounts');
        this.store.dispatch(setLoadingError({ loadError: true }));
        return throwError(error);
      }),
      map((rawData) => {
        //console.log('Accounts effect', rawData);
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

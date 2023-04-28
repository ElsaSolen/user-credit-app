import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as StoreActions from './app.actions';
import { UsersService } from '../services/users.service';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../interfaces/account.interface';
import { User } from '../interfaces/user.interface';

//TODO: Add error handler for Account effect
//TODO: Add reducer and logic/screen/alert for error case
//Check out the vs code example
//Make Pr for each section

@Injectable()
export class AppEffects {
  userFetching$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getUserInfo),
      map((action) => this.userService.getUsers(action.user)),
      // add alert or action before throwError
      catchError((error) => throwError(error)),
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
      // add alert or action before throwError
      catchError((error) => throwError(error)),
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
    private accountsService: AccountsService
  ) {}
}

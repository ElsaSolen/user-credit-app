import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from './interfaces/account.interface';
import { DataTable } from './interfaces/dataTable.interface';
import { User } from './interfaces/user.interface';
import {
  getAccountInfo,
  getUserInfo,
  setLoadingError,
} from './store/app.actions';
import * as selectors from './store/app.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  data: DataTable[];

  showErrorPage$ = this.store.select(selectors.getLoadingError);
  filterSelector$ = combineLatest([
    this.store.select(selectors.getUsers),
    this.store.select(selectors.getAccounts),
  ]).pipe(
    tap(([users, accounts]: [User[], Account[]]) => {
      this.store.dispatch(setLoadingError({ loadError: false }));
      this.cooncatById(users, accounts);
    })
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription$ = this.filterSelector$.subscribe();
    this.store.dispatch(getUserInfo({ user: '' }));
    this.store.dispatch(getAccountInfo());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  receiveInputData($event: string): void {
    this.store.dispatch(getUserInfo({ user: $event }));
  }

  cooncatById(userData: User[], creditsData: Account[]): void {
    const tableData: DataTable[] = [];
    userData.map((userItem: User) => {
      const creditItem = creditsData.find(
        (credit: Account) => credit.id === userItem.id
      );
      if (creditItem) {
        tableData.push({ user: userItem.name, credit: creditItem.credit });
      }
    });
    this.data = tableData;
  }
}

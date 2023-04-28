import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from './interfaces/account.interface';
import { DataTable } from './interfaces/dataTable.interface';
import { User } from './interfaces/user.interface';
import { getAccountInfo, getUserInfo } from './store/app.actions';
import * as selectors from './store/app.selectors';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //Checkout the folder structure
  filterSelector$ = combineLatest([
    this.store.select(selectors.getUsers),
    this.store.select(selectors.getAccounts),
  ]).pipe(
    map(([users, accounts]: [User[], Account[]]) => {
      return this.cooncatById(users, accounts);
    })
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getUserInfo({ user: '' }));
    this.store.dispatch(getAccountInfo());
  }

  receiveInputData($event: string) {
    this.store.dispatch(getUserInfo({ user: $event }));
  }

  cooncatById(userData: User[], creditsData: Account[]): DataTable[] {
    const tableData: DataTable[] = [];

    userData.map((userItem: User) => {
      const creditItem = creditsData.find(
        (credit: Account) => credit.id === userItem.id
      );
      if (creditItem) {
        tableData.push({ user: userItem.name, credit: creditItem.credit });
      }
    });

    return tableData;
  }
}

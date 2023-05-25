import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from './interfaces/account.interface';
import { DataTable } from './interfaces/dataTable.interface';
import { User } from './interfaces/user.interface';
import {
  getAccountInfo,
  getUserInfo,
  setError,
  setLoader,
} from './store/app.actions';
import * as selectors from './store/app.selectors';
import { ThemeService } from './services/themes.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: DataTable[];
  checked: boolean;

  spinner$ = this.store.select(selectors.getLoader);
  users$ = this.store.select(selectors.getUsers);
  accounts$ = this.store.select(selectors.getAccounts);
  showErrorPage$ = this.store.select(selectors.getError);

  tableDataSelector$ = combineLatest([
    this.users$,
    this.accounts$,
    this.spinner$,
  ]).pipe(
    tap(([users, accounts, spinner]: [User[], Account[], boolean]) => {
      //spinner is set to false only if we have data sent from the services, if there is no data sent it will loop indefinetly
      if (users?.length && accounts?.length && spinner) {
        this.store.dispatch(setLoader({ loader: false }));
        this.cdRef.detectChanges();
      }
      this.store.dispatch(setError({ error: false }));
      this.cooncatById(users, accounts);
    })
  );

  constructor(
    private store: Store,
    private themeService: ThemeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getUserInfo({ user: '' }));
    this.store.dispatch(getAccountInfo());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.checked = !this.checked;

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

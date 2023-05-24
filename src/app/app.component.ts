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

  spinner$ = this.store.select(selectors.getLoader);
  showErrorPage$ = this.store.select(selectors.getError);
  dataNotFound: boolean = false;

  tableDataSelector$ = combineLatest([
    this.store.select(selectors.getUsers),
    this.store.select(selectors.getAccounts),
    this.store.select(selectors.getLoader),
  ]).pipe(
    tap(([users, accounts, spinner]: [User[], Account[], boolean]) => {
      this.store.dispatch(setError({ error: false }));
      if (users?.length && accounts?.length && spinner) {
        this.cooncatById(users, accounts);
        this.store.dispatch(setLoader({ loader: false }));
        this.cdRef.detectChanges();
      } else if ((!users?.length || !accounts?.length )&& !spinner) {
        this.dataNotFound = true;
      } else {
        this.cooncatById(users, accounts);
      }
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
  }

  receiveInputData($event: string): void {
    this.store.dispatch(getUserInfo({ user: $event }));
    this.dataNotFound = false;
  }

  cooncatById(userData: User[], creditsData: Account[]): void {
    console.log(userData, creditsData);
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

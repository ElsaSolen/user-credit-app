import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
  getAccounts() {
    return accounts;
    //throw new Error('Error of getAccount!');
  }
}

const accounts: Account[] = [
  { id: 1, credit: 50 },
  { id: 2, credit: 40 },
  { id: 3, credit: 5 },
  { id: 4, credit: 20 },
];

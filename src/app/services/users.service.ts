import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, of, delay } from 'rxjs';

@Injectable()
export class UsersService {
  private firstCall = true;

  getUsers(searchUser: string): Observable<User[]> | void {
    if (searchUser.length >= 10) {
      throw new Error('Error of getUsers!');
    } else {
      const filteredUsers = users.filter((value: User) =>
        value.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      if (this.firstCall) {
        this.firstCall = false;
        return of(filteredUsers).pipe(delay(1000));
      } else {
        return of(filteredUsers);
      }
    }
  }
}

const users: User[] = [
  { id: 1, name: 'Sam' },
  { id: 2, name: 'Ella' },
  { id: 3, name: 'Roy' },
  { id: 4, name: 'Rober' },
  { id: 5, name: 'John' },
  { id: 5, name: 'Trevor' },
  { id: 5, name: 'Tanjiro' },
];

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  getUsers(searchUser: string) {
    return users.filter((value: User) =>
      value.name.toLowerCase().includes(searchUser.toLowerCase())
    );

    //throw new Error('Error of getUsers!');
    //create PR and issues for enhancements (smoll ones)
  }
}

const users: User[] = [
  { id: 1, name: 'Sam' },
  { id: 2, name: 'Ella' },
  { id: 3, name: 'Roy' },
  { id: 4, name: 'Sam' },
];

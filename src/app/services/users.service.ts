import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  getUsers(searchUser: string) {
    if (searchUser.length >= 5) {
      throw new Error('Error of getUsers!');
    } else {
      const x = users.filter((value: User) =>
        value.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      return x;
    }
  }
}

const users: User[] = [
  { id: 1, name: 'Sam' },
  { id: 2, name: 'Ella' },
  { id: 3, name: 'Roy' },
  { id: 4, name: 'Sam' },
  { id: 5, name: 'Samul' },
];

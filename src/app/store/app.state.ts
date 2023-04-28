import { Account } from '../interfaces/account.interface';
import { User } from '../interfaces/user.interface';

export interface AppState {
  users: User[];
  accounts: Account[];
}

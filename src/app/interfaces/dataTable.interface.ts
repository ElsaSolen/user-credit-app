import { Account } from "./account.interface";
import { User } from "./user.interface";

export interface DataTable {
  user: User['name'];
  credit: Account['credit'];
}

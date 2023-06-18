import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataTable } from '@interfaces/index';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() rawData: DataTable[];
  readonly headers: string[] = ['users', 'credits'];

  displayData: DataTable[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  dataPerPage(paginatedData: DataTable[]): void {
    this.displayData = paginatedData;
    this.cdr.detectChanges();
  }

  ascCredits = false;
  ascUsers = false;

  sort(header) {
    let arr = [];
    if (header === 'credits') {
      arr = this.rawData.slice().sort((a, b) => {
        return this.ascCredits ? b.credit - a.credit : a.credit - b.credit;
      });
      this.ascCredits = !this.ascCredits;
    } else {
      arr = this.rawData.slice().sort((a, b) => {
        const userA = a.user.toUpperCase();
        const userB = b.user.toUpperCase();

        if (userA < userB) {
          return this.ascUsers ? 1 : -1;
        }
        if (userA > userB) {
          return this.ascUsers ? -1 : 1;
        }
        return 0;
      });
    }

    this.ascUsers = !this.ascUsers;
    this.rawData = arr;
  }
}

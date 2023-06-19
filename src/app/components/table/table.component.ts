import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataTable } from '@interfaces/index';
import { sortData } from './../../utils/sorting.util';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TranslatePipe],
})
export class TableComponent implements OnInit {
  @Input() rawData: DataTable[];
  headers: string[] = ['users', 'credits'];

  displayData: DataTable[] = [];
  ascCredits: boolean = false;
  ascUsers: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  dataPerPage(paginatedData: DataTable[]): void {
    this.displayData = paginatedData;
    this.cdr.detectChanges();
  }

  sort(sortKey: string): void {
    let sortOrder: 'asc' | 'desc';
    let sortType: number | string;

    sortKey === this.headers[1] ? (sortType = 0) : (sortType = '');
    sortKey = sortKey.slice(0, -1);
    if (typeof sortType === 'number') {
      this.ascCredits ? (sortOrder = 'desc') : (sortOrder = 'asc');
      this.ascCredits = !this.ascCredits;
    } else {
      this.ascUsers ? (sortOrder = 'desc') : (sortOrder = 'asc');
      this.ascUsers = !this.ascUsers;
    }
    this.rawData = sortData(this.rawData, sortType, sortKey, sortOrder);
  }
}

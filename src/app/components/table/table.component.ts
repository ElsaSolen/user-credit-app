import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataTable } from '@interfaces/index';
import { sortData } from './../../utils/sorting.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() rawData: DataTable[];
  readonly headers: string[] = [
    this.translate.instant('users'),
    this.translate.instant('credits'),
  ];
  displayData: DataTable[] = [];
  ascCredits: boolean = false;
  ascUsers: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    console.log('test', this.translate.instant('users'));
  }

  dataPerPage(paginatedData: DataTable[]): void {
    this.displayData = paginatedData;
    this.cdr.detectChanges();
  }

  sort(sortKey: string): void {
    let sortOrder: 'asc' | 'desc';
    let sortType: number | string;

    sortKey = sortKey.slice(0, -1);
    sortKey === 'credit' ? (sortType = 0) : (sortType = '');

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

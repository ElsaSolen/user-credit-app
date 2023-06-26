import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { sortData } from './../../utils/sorting.util';
import { SortType } from './../../types/sortType';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TranslatePipe],
})
export class TableComponent implements OnInit {
  @Input() rawData: {}[];

  sortOrder: SortType = 'desc';

  displayData: {}[];
  headers: string[];
  sortKey: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.headers = Object.keys(this.rawData[0]);
  }

  dataPerPage(paginatedData: {}[]): void {
    this.displayData = paginatedData;
    this.cdr.detectChanges();
  }

  sort(sortKey: string): void {
    let sortType = typeof this.rawData[0][sortKey];
    this.sortKey = sortKey;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.rawData = sortData(this.rawData, sortType, sortKey, this.sortOrder);
  }
}

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
}

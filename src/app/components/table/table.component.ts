import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataTable } from '../../interfaces/index';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: DataTable[];
  readonly headers: string[] = ['users', 'credits'];

  pagedData: DataTable[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  dataPerPage(data: DataTable[]): void {
    this.pagedData = data;
    this.cdr.detectChanges();
  }
}

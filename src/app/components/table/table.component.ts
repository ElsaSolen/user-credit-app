import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from '../../interfaces/dataTable.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: DataTable[];
  public headers = ['users', 'credits'];

  constructor() {}

  ngOnInit(): void {}
}

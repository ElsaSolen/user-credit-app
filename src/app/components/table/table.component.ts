import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from '../../interfaces/dataTable.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() data: DataTable[];
  public headers: string[];

  constructor() {
    this.headers = ['users', 'credits'];
  }

  ngOnInit(): void {}
}

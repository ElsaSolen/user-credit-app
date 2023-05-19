import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DataTable } from '../../interfaces/dataTable.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: DataTable[];
  headers = ['users', 'credits'];

  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number = 3;
  pagedData: any[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.calculatePagination();
    }
  }
  constructor() {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  calculatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.data.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  }

  goToPreviousPage(): void {
    this.currentPage--;
    this.calculatePagination();
  }

  goToNextPage(): void {
    this.currentPage++;
    this.calculatePagination();
  }
}

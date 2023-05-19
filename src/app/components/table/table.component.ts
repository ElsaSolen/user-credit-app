import { findAllSubstringIndices } from '@angular/cdk/schematics/ng-update/public-api';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataTable } from '../../interfaces/dataTable.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: DataTable[];
  headers = ['users', 'credits'];

  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number = 3;
  pagedData: DataTable[];
  previousButtonDisabled = false;
  nextButtonDisabled = false;

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
    this.previousButtonDisabled = this.currentPage === 1;
    this.nextButtonDisabled =
      this.currentPage === this.totalPages || this.totalPages === 0;
  }

  goToPreviousPage(): void {
    this.currentPage--;
    this.calculatePagination();
  }

  goToNextPage(): void {
    console.log('go to next page');
    this.currentPage++;
    this.calculatePagination();
  }
}

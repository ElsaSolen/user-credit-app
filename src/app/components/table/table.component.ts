import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { log } from 'console';
import { DataTable } from '../../interfaces/dataTable.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: DataTable[];
  readonly headers: string[] = ['users', 'credits'];

  currentPage: number = 1;
  itemsPerPage: number[] = [3, 5, 10];
  selectedOption: number = 3;
  length: number;

  totalPages: number;
  pagedData: DataTable[];
  previousButtonDisabled: boolean;
  nextButtonDisabled: boolean;

  startIndex: number;
  endIndex: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.calculatePagination();
    }
  }

  ngOnInit(): void {
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.length = this.data.length;
    this.startIndex = (this.currentPage - 1) * this.selectedOption;
    this.endIndex =
      this.startIndex + this.selectedOption < this.length
        ? this.startIndex + this.selectedOption
        : this.length;
    this.pagedData = this.data.slice(this.startIndex, this.endIndex);
    this.totalPages = Math.ceil(this.data.length / this.selectedOption);
    this.updateDisabledButtons();
  }

  updateDisabledButtons(): void {
    this.previousButtonDisabled = this.currentPage === 1;
    this.nextButtonDisabled =
      this.currentPage === this.totalPages || this.totalPages === 0;
  }

  goToPreviousPage(): void {
    this.currentPage--;
    this.calculatePagination();
  }

  goToNextPage(): void {
    this.currentPage++;
    this.calculatePagination();
  }

  onSelectionChange(selection: string): void {
    this.selectedOption = parseInt(selection);
    this.calculatePagination();
  }
}

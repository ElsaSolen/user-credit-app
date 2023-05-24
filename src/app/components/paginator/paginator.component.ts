import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import { DataTable } from '../../interfaces/dataTable.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() childData: DataTable[];
  @Output() pagedData = new EventEmitter<DataTable[]>();

  currentPage: number = 1;
  itemsPerPage: number[] = [3, 5, 10];
  selectedOption: number = 3;
  length: number;

  totalPages: number;
  previousButtonDisabled: boolean;
  nextButtonDisabled: boolean;

  startIndex: number;
  endIndex: number;

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
    this.length = this.childData.length;
    this.startIndex = (this.currentPage - 1) * this.selectedOption;
    this.endIndex =
      this.startIndex + this.selectedOption < this.length
        ? this.startIndex + this.selectedOption
        : this.length;
    const dataSliced = this.childData.slice(this.startIndex, this.endIndex);

    this.pagedData.emit(dataSliced);
    this.totalPages = Math.ceil(this.childData.length / this.selectedOption);
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

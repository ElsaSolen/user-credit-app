import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() inputChanged = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  form = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    this.createForm();

    //use @HostListener directive for the input changes
    this.form
      .get('searchUsers')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((val: string) => {
        this.inputChanged.emit(val);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createForm(): void {
    this.form = new FormGroup({
      searchUsers: new FormControl(''),
    });
  }
}

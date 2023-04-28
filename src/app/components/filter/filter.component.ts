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

  form = new FormGroup({});
  private destroy$ = new Subject<void>();

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
    //impossible to subscribe after completion

    //so completing to prevent any futur subscribtions to the same Subject and in case there are other subscriptions that we didn't pay attention to, so it unsubscribes to them after complete, but in this case we only have 1 subscription and unsubscribing from it is way enough
  }

  public createForm(): void {
    this.form = new FormGroup({
      searchUsers: new FormControl(''),
    });
  }
}

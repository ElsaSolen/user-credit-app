import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() inputChanged = new EventEmitter<string>();

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    this.inputChanged.emit(event.target.value);
  }

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}
}

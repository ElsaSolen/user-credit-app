import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() icon: string;
  @Output() themeChanged = new EventEmitter<boolean>();

  checked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleTheme(): void {
    this.checked = !this.checked;
    this.themeChanged.emit(this.checked);
  }
}

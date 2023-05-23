import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  HostListener,
} from '@angular/core';
import { ThemeService } from '../../services/themes.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() inputChanged = new EventEmitter<string>();
  isDarkThemeTable: boolean = false;

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.inputChanged.emit(inputElement.value);
  }

  constructor(private themeService: ThemeService) {
    this.themeService
      .getThemeChangeSubject()
      .subscribe((isDarkTheme: boolean) => {
        this.isDarkThemeTable = isDarkTheme;
      });
  }

  ngOnInit(): void {}
}

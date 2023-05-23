import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme: boolean = false;
  private themeChangeSubject: Subject<boolean> = new Subject<boolean>();

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    this.themeChangeSubject.next(this.isDarkTheme);
  }
  getThemeChangeSubject(): Subject<boolean> {
    return this.themeChangeSubject;
  }
}

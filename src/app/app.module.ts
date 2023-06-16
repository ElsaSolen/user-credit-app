import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/app.reducer';
import { AppEffects } from './store/app.effects';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AccountsService, UsersService, ThemeService } from './services/index';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToggleComponent } from './components/toggle/toggle.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
  ],
  declarations: [
    AppComponent,
    FilterComponent,
    TableComponent,
    PaginatorComponent,
    SpinnerComponent,
    ToggleComponent,
  ],
  bootstrap: [AppComponent],
  providers: [AccountsService, UsersService, ThemeService],
})
export class AppModule {}

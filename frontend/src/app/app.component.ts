// src/app/app.component.ts
import { Component } from '@angular/core';
import { CountryManagementComponent } from './country-management/country-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountryManagementComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}

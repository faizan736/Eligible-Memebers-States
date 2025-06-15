// src/app/country-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Country, CountryService } from '../country.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-country-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './country-management.component.html',
  styleUrls: ['./country-management.component.scss'],
})
export class CountryManagementComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm = '';
  showCheckboxes = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.filteredCountries = [...data];
    });
  }

  searchCountries(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter((c) =>
      c.name.toLowerCase().includes(term)
    );
  }

  updateList(): void {
    this.showCheckboxes = true;
    this.countries.forEach((c) => (c.isEligible = true));
  }

  onCheckboxToggle(country: Country): void {
    if (!country.isEligible) {
      const confirmed = confirm(
        `This data will be removed from the backend. Proceed?`
      );
      if (confirmed) {
        this.countryService.removeEligibility(country.name).subscribe(() => {
          // Remove from arrays
          this.countries = this.countries.filter(
            (c) => c.name !== country.name
          );
          this.filteredCountries = this.filteredCountries.filter(
            (c) => c.name !== country.name
          );
        });
      } else {
        country.isEligible = true; 
      }
    }
  }
}

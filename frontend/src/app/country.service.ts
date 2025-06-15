// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface Country {
  _id: string;
  name: string;
  isEligible: boolean;
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = 'http://localhost:5000/api/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl);
  }

  updateEligibleCountries(names: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, {
      eligibleCountries: names,
    });
  }
  removeEligibility(name: string) {
  return this.http.delete(`${this.baseUrl}/${name}`);
  } 

}

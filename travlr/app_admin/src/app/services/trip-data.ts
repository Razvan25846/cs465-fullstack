import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private auth: Authentication
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/trips`);
  }

  addTrip(trip: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseUrl}/trips`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  getTrip(code: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`
    );
  }

  updateTrip(code: string, trip: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteTrip(code: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/trips`);
  }

  addTrip(trip: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/trips`, trip);
  }

  getTrip(code: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`
    );
  }

  updateTrip(code: string, trip: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`,
      trip
    );
  }
  deleteTrip(code: string): Observable<any> {
  return this.http.delete<any>(
    `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`
  );
}
}
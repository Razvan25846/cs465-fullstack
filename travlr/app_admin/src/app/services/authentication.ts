import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private apiBaseUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr-token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiBaseUrl}/login`,
      { email, password }
    ).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return typeof payload.exp === 'number' &&
        payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}
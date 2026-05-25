// core/services/movement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from '../models/movement.model';

@Injectable({ providedIn: 'root' })
export class MovementService {

  private baseUrl = 'https://localhost:7013/api/movements';

  constructor(private http: HttpClient) {}

  getMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.baseUrl);
  }

  getMovementById(id: number): Observable<Movement> {
    return this.http.get<Movement>(`${this.baseUrl}/${id}`);
  }

  createMovement(movement: Movement): Observable<Movement> {
    return this.http.post<Movement>(this.baseUrl, movement);
  }

  updateMovement(movement: Movement): Observable<Movement> {
    return this.http.put<Movement>(`${this.baseUrl}/${movement.id}`, movement);
  }

  deleteMovement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

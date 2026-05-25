import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockHistory } from '../models/stock-history.model';

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {

  private apiUrl = 'https://localhost:7013/api/stockhistory';

  constructor(private http: HttpClient) {}

  getHistory(): Observable<StockHistory[]> {
    return this.http.get<StockHistory[]>(this.apiUrl);
  }
}

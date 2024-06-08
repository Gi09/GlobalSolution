import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OceanData } from '../interfaces/OceanData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private apiUrl = 'https://fiap-3sis-gs-20241.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getData(): Observable<OceanData[]> {
    return this.http.get<OceanData[]>(`${this.apiUrl}/OceanData`);
  }
}

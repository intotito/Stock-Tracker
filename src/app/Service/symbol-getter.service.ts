import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SymbolGetterService {

  constructor(private httpClient: HttpClient) { }

  getSymbol(url: string): Observable<any>{
    return this.httpClient.get(url);
  }
}

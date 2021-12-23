import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export abstract class AbstractService {
  constructor(private endpoint: string, private http: HttpClient) {}

  /**
   * GET
   */
  get<reqType, resType>(uri: string, params?: reqType): Observable<resType> {
    return this.http.get<resType>(`${this.endpoint}/${uri}`, params);
  }

  /**
   * POST
   */
  post<reqType, resType>(uri: string, params?: reqType): Observable<resType> {
    return this.http.post<resType>(`${this.endpoint}/${uri}`, params);
  }
}

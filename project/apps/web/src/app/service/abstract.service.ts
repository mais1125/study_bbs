import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export abstract class AbstractService {
  constructor(private endpoint: string, private http: HttpClient) {}

  /**
   * GET
   */
  get<reqEntity, resEntity>(
    uri: string,
    params?: reqEntity
  ): Observable<resEntity> {
    return this.http.get<resEntity>(`${this.endpoint}/${uri}`, params);
  }

  /**
   * POST
   */
  post<reqEntity, resEntity>(
    uri: string,
    params?: reqEntity
  ): Observable<resEntity> {
    return this.http.post<resEntity>(`${this.endpoint}/${uri}`, params);
  }
}

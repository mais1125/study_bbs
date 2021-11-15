import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';

@Injectable({ providedIn: 'root' })
export class ApiService extends AbstractService {
  constructor(http: HttpClient) {
    super('api/v1', http);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type HoData = { foo: string };

@Injectable()
export class HoService {
  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get<HoData>('/assets/data.json');
  }
}

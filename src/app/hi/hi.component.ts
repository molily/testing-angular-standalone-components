import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

type Data = { foo: string };

@Component({
  selector: 'app-hi',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './hi.component.html',
})
export class HiComponent implements OnInit {
  public data$?: Observable<Data>;

  constructor(public httpClient: HttpClient) {}

  ngOnInit(): void {
    this.data$ = this.httpClient.get<Data>('/assets/data.json');
  }
}

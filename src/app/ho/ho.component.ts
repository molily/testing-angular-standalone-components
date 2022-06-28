import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  HoData,
  HoService,
} from './ho.service';

@Component({
  selector: 'app-ho',
  standalone: true,
  imports: [CommonModule],
  viewProviders: [HoService],
  templateUrl: './ho.component.html',
})
export class HoComponent implements OnInit {
  public data$?: Observable<HoData>;

  constructor(public hoService: HoService) {}

  ngOnInit(): void {
    this.data$ = this.hoService.getData();
  }
}

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { HoComponent } from './ho.component';

describe('HoComponent', () => {
  let component: HoComponent;
  let fixture: ComponentFixture<HoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', () => {
    const controller = TestBed.inject(HttpTestingController);

    const request = controller.expectOne({
      method: 'GET',
      url: '/assets/data.json',
    });
    request.flush({ foo: 'test' });

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('test');
  });
});

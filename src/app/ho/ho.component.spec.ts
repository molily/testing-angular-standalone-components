import {
  HttpBackend,
  HttpClientModule,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ExistingProvider,
  importProvidersFrom,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { HoComponent } from './ho.component';

describe('HoComponent', () => {
  let component: HoComponent;
  let fixture: ComponentFixture<HoComponent>;

  beforeEach(async () => {
    // Find the HttpBackend of HttpClientTestingModule since it is not exported directly
    // See https://github.com/angular/angular/blob/main/packages/common/http/testing/src/backend.ts
    const providers = importProvidersFrom(HttpClientTestingModule);
    let httpClientTestingBackend: ExistingProvider | undefined;
    for (const provider of providers.ɵproviders) {
      if (
        'provide' in provider &&
        'useExisting' in provider &&
        provider.provide === HttpBackend
      ) {
        httpClientTestingBackend = provider;
      }
    }
    if (!httpClientTestingBackend) {
      throw new Error('HttpClientTestingBackend provider not found');
    }

    await TestBed.configureTestingModule({
      imports: [HoComponent, HttpClientTestingModule],
    })
      .overrideModule(HttpClientModule, {
        add: {
          // Inject HttpClientTestingBackend, like HttpClientTestingModule does
          // See https://github.com/angular/angular/blob/main/packages/common/http/testing/src/module.ts
          providers: [
            {
              provide: HttpBackend,
              useExisting: httpClientTestingBackend.useExisting,
            },
          ],
        },
      })
      .compileComponents();

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

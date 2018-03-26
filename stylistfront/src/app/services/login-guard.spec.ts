import { TestBed, inject } from '@angular/core/testing';

import { LoginRouteGuard } from './login-guard';

describe('LoginRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRouteGuard]
    });
  });

  it('should be created', inject([LoginRouteGuard], (service: LoginRouteGuard) => {
    expect(service).toBeTruthy();
  }));
});

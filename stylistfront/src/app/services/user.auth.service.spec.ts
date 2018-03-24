import { TestBed, inject } from '@angular/core/testing';

import { User.AuthService } from './user.auth.service';

describe('User.AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User.AuthService]
    });
  });

  it('should be created', inject([User.AuthService], (service: User.AuthService) => {
    expect(service).toBeTruthy();
  }));
});

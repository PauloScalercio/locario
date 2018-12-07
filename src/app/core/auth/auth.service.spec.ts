import { TestBed, inject } from '@angular/core/testing';

import { AuthServiceApp } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceApp]
    });
  });

  it('should be created', inject([AuthServiceApp], (service: AuthServiceApp) => {
    expect(service).toBeTruthy();
  }));
});

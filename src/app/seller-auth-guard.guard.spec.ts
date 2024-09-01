import { TestBed } from '@angular/core/testing';

import { SellerAuthGuardGuard } from './seller-auth-guard.guard';

describe('SellerAuthGuardGuard', () => {
  let guard: SellerAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

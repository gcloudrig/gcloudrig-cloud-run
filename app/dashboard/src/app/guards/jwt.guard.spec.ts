import { TestBed } from '@angular/core/testing';

import { JwtGuard } from './jwt.guard';

describe('JwtGuard', () => {
  let guard: JwtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JwtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

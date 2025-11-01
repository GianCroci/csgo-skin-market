import { TestBed } from '@angular/core/testing';

import { CheckEmail } from './check-email';

describe('CheckEmail', () => {
  let service: CheckEmail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckEmail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

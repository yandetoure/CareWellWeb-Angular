import { TestBed } from '@angular/core/testing';

import { MedicalfileService } from './medicalfile.service';

describe('MedicalfileService', () => {
  let service: MedicalfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

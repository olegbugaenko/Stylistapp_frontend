import { TestBed, inject } from '@angular/core/testing';

import { ManageServicesService } from './manage-services.service';

describe('ManageServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageServicesService]
    });
  });

  it('should be created', inject([ManageServicesService], (service: ManageServicesService) => {
    expect(service).toBeTruthy();
  }));
});

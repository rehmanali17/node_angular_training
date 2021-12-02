import { TestBed } from '@angular/core/testing';

import { ManageTodosService } from './manage-todos.service';

describe('ManageTodosService', () => {
  let service: ManageTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

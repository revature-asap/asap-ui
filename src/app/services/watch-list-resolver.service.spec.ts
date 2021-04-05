import { TestBed } from '@angular/core/testing';

import { WatchListResolverService } from './watch-list-resolver.service';

describe('WatchListResolverService', () => {
  let service: WatchListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

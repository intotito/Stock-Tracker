import { TestBed } from '@angular/core/testing';

import { ImageSaverService } from './image-saver.service';

describe('ImageSaverService', () => {
  let service: ImageSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

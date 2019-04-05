import { TestBed } from '@angular/core/testing';

import { BotService } from './bot.service';

describe('BotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotService = TestBed.get(BotService);
    expect(service).toBeTruthy();
  });
});

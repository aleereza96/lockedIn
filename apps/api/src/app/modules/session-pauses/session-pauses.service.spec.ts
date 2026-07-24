import { Test, TestingModule } from '@nestjs/testing';
import { SessionPausesService } from './session-pauses.service';

describe('SessionPausesService', () => {
  let service: SessionPausesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionPausesService],
    }).compile();

    service = module.get<SessionPausesService>(SessionPausesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

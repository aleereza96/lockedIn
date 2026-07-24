import { Test, TestingModule } from '@nestjs/testing';
import { SessionPausesController } from './session-pauses.controller';
import { SessionPausesService } from './session-pauses.service';

describe('SessionPausesController', () => {
  let controller: SessionPausesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionPausesController],
      providers: [SessionPausesService],
    }).compile();

    controller = module.get<SessionPausesController>(SessionPausesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

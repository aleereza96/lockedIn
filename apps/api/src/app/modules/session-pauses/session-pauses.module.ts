import { Module } from '@nestjs/common';
import { SessionPausesService } from './session-pauses.service';
import { SessionPausesController } from './session-pauses.controller';

@Module({
  controllers: [SessionPausesController],
  providers: [SessionPausesService],
})
export class SessionPausesModule {}

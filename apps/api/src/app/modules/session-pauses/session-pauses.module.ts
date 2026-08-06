import { Module } from '@nestjs/common'
import { SessionPausesService } from './session-pauses.service'

@Module({
	providers: [SessionPausesService]
})
export class SessionPausesModule {}

import { Module } from '@nestjs/common'
import { SessionsService } from './sessions.service'
import {
	SessionsAdminController,
	SessionsController
} from './sessions.controller'

@Module({
	controllers: [SessionsController, SessionsAdminController],
	providers: [SessionsService]
})
export class SessionsModule {}

import { Module } from '@nestjs/common'
import { DumpsService } from './dumps.service'
import { DumpsAdminController, DumpsController } from './dumps.controller'

@Module({
	controllers: [DumpsController, DumpsAdminController],
	providers: [DumpsService]
})
export class DumpsModule {}

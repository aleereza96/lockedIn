import { Module } from '@nestjs/common'
import { DumpsService } from './dumps.service'
import { DumpsController } from './dumps.controller'

@Module({
	controllers: [DumpsController],
	providers: [DumpsService]
})
export class DumpsModule {}

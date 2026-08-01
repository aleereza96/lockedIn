import { Module } from '@nestjs/common'
import { TopicsService } from './topics.service'
import { TopicsAdminController, TopicsController } from './topics.controller'

@Module({
	controllers: [TopicsController, TopicsAdminController],
	providers: [TopicsService]
})
export class TopicsModule {}

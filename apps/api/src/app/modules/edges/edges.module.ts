import { Module } from '@nestjs/common'
import { EdgesService } from './edges.service'

@Module({
	providers: [EdgesService]
})
export class EdgesModule {}

import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				store: await redisStore({
					url: configService.get<string>('cache.redisUrl')
				}),
				ttl: configService.get<number>('cache.ttl')
			})
		})
	]
})
export class CacheManagerModule {}

import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import config from './config'
import { LoggerService } from './logger/logger.service'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { CacheManagerModule } from './cache-manager/cache-manager.module'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: false,
			isGlobal: true,
			cache: true,
			expandVariables: true,
			load: config
		}),
		DatabaseModule,
		CacheManagerModule
	],
	providers: [
		LoggerService,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor
		}
	],
	exports: [DatabaseModule, CacheManagerModule]
})
export class CommonModule {}

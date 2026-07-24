import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DatabaseType } from 'typeorm'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: configService.get('database.type') as DatabaseType,
					host: configService.get('database.host') as string,
					port: +configService.get('database.port'),
					username: configService.get('database.username') as string,
					password: configService.get('database.password') as string,
					synchronize: configService.get('database.synchronize') as boolean,
					autoLoadEntities: configService.get(
						'database.autoLoadEntities'
					) as boolean,
					database: configService.get('database.name') as string
				} as TypeOrmModuleOptions
			}
		})
	],
	providers: []
})
export class DatabaseModule {}

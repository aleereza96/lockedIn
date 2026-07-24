import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TokenService } from './services/token.service'

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				secret: config.get('auth.tokenSecret'),
				signOptions: {
					expiresIn: config.get('auth.accessTokenExpiresIn')
				}
			}),
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, TokenService],
	exports: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}

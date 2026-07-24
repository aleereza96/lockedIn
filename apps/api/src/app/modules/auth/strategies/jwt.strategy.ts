import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from '../dto/jwt-payload.dto'
import { UsersService } from '../../users/users.service'
import { User } from '../../users/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UsersService,
		private configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('auth.tokenSecret')
		})
	}

	async validate({ username }: JwtPayload): Promise<User> {
		const user = await this.userService.findUserByUsername(username)
		if (!user) {
			throw new UnauthorizedException('Access Denied')
		}
		return user
	}
}

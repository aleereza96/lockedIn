import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { BLACKLIST_TOKENS_PREFIX } from '../../../common/constants/constants'
import { JwtPayload } from '../dto/jwt-payload.dto'
import { TokenDto } from '../dto/token.dto'
import { timeToSeconds } from '../../../common/helpers/utils'

@Injectable()
export class TokenService {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	public async generateAuthToken(payload: JwtPayload): Promise<TokenDto> {
		const accessTokenExpires = this.configService.get(
			'auth.accessTokenExpiresIn'
		)
		const accessToken = await this.generateToken(payload)

		return { accessToken }
	}

	public verifyToken(token: string) {
		try {
			return this.jwtService.verify(token)
		} catch (err) {
			throw new UnauthorizedException('Access Denied')
		}
	}

	public async isBlacklisted(token: string, username: string) {
		const key = `${BLACKLIST_TOKENS_PREFIX}:${username}`
		const storedValue = await this.cacheManager.get(key)
		return storedValue === token
	}

	public async saveTokenOnBlacklist(
		token: string,
		username: string
	): Promise<string> {
		const key = `${BLACKLIST_TOKENS_PREFIX}:${username}`
		const accessTokenTtl = this.configService.get('auth.accessTokenExpiresIn')
		const ttl = timeToSeconds(accessTokenTtl)
		return await this.cacheManager.set(key, token, ttl)
	}

	private async generateToken(payload: JwtPayload): Promise<string> {
		return await this.jwtService.signAsync(payload)
	}
}

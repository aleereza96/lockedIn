import { Injectable } from '@nestjs/common'
import { UsersService } from '../../users/users.service'
import { TokenService } from './token.service'
import { RegisterDto } from '../dto/register.dto'
import { AuthResponseDto } from '../dto/auth-response.dto'
import { AuthMapper } from '../auth.mapper'
import { JwtPayload } from '../dto/jwt-payload.dto'
import { User } from '../../users/entities/user.entity'
import { UserMapper } from '../../users/users.mapper'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService: TokenService,
		private readonly userMapper: UserMapper
	) {}

	public async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userService.findUserByUsername(username)
		if (!user) {
			return null
		}
		const matchedPassword = await this.userService.matchPassword(
			password,
			user.password
		)
		if (matchedPassword) {
			const { password, ...result } = user
			return result
		}

		return null
	}

	public async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
		const createUserDto = AuthMapper.toCreateUserDto(registerDto)
		const user = await this.userService.create(createUserDto)
		const payload: JwtPayload = {
			id: `${user.id}`,
			username: user.username
		}

		const token = await this.tokenService.generateAuthToken(payload)
		const permissions = []

		return {
			user,
			permissions,
			token
		}
	}

	public async login(user: User): Promise<AuthResponseDto> {
		const payload: JwtPayload = { id: `${user.id}`, username: user.username }
		const token = await this.tokenService.generateAuthToken(payload)
		const permissions = user.roles.flatMap((role) =>
			role.permissions.map((permission) => permission.slug)
		)
		const authorizedUser = this.userMapper.toDto(user)

		return {
			user: authorizedUser,
			permissions,
			token
		}
	}

	public async logout(user: User, token: string) {
		return await this.tokenService.saveTokenOnBlacklist(token, user.username)
	}
}

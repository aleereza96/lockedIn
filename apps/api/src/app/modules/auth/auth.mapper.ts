import { plainToInstance } from 'class-transformer'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { RegisterDto } from './dto/register.dto'

export class AuthMapper {
	public static toCreateUserDto(dto: RegisterDto): CreateUserDto {
		return plainToInstance(CreateUserDto, {
			username: dto.username,
			password: dto.password
		})
	}
}

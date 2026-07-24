import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserMapper extends AbstractMapper<
	User,
	CreateUserDto,
	UpdateUserDto,
	UserResponseDto
> {
	public toDto(entity: User): UserResponseDto {
		return plainToInstance(UserResponseDto, {
			id: String(entity.id),
			username: entity.username
		})
	}

	public toCreateEntity(dto: CreateUserDto): User {
		return plainToInstance(User, {
			username: dto.username,
			password: dto.password
		})
	}

	public toUpdateEntity(entity: User, dto: UpdateUserDto): User {
		if (dto.username !== undefined) entity.username = dto.username
		return entity
	}
}

import { Injectable } from '@nestjs/common'
import { CreateProfileDto } from './dto/create-profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { ProfileResponseDto } from './dto/profile-response.dto'
import { Profile } from './profile.entity'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ProfileMapper extends AbstractMapper<
	Profile,
	CreateProfileDto,
	UpdateProfileDto,
	ProfileResponseDto
> {
	public toDto(entity: Profile): ProfileResponseDto {
		return plainToInstance(ProfileResponseDto, {
			id: `${entity.id}`,
			firstName: entity.firstName,
			lastName: entity.lastName,
			email: entity.email,
			avatar: entity.avatar
		})
	}

	public toCreateEntity(dto: CreateProfileDto): Profile {
		return plainToInstance(Profile, {
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			avatar: dto.avatar
		})
	}

	public toUpdateEntity(entity: Profile, dto: UpdateProfileDto): Profile {
		if (dto.firstName !== undefined) entity.firstName = dto.firstName
		if (dto.lastName !== undefined) entity.lastName = dto.lastName
		if (dto.email !== undefined) entity.email = dto.email
		if (dto.avatar !== undefined) entity.avatar = dto.avatar
		return entity
	}
}

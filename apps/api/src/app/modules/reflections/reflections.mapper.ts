import { Injectable } from '@nestjs/common'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { Reflection } from './entities/reflection.entity'
import {
	ReflectionAdminResponseDto,
	UpdateReflectionAdminDto
} from './dto/admin-reflection.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ReflectionAdminMapper extends AbstractMapper<
	Reflection,
	any,
	UpdateReflectionAdminDto,
	ReflectionAdminResponseDto
> {
	public toDto(entity: Reflection): ReflectionAdminResponseDto {
		return plainToInstance(ReflectionAdminResponseDto, {
			id: String(entity.id),
			body: entity.body,
			sessionId: entity.sessionId,
			userId: entity.userId,
			createdAt: entity.createdAt
		})
	}

	public toUpdateEntity(
		entity: Reflection,
		dto: UpdateReflectionAdminDto
	): Reflection {
		if (dto.body !== undefined) entity.body = dto.body
		if (dto.sessionId !== undefined) entity.sessionId = dto.sessionId
		if (dto.userId !== undefined) entity.userId = dto.userId
		return entity
	}
}

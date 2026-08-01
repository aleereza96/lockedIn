import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { Topic } from './entities/topic.entity'
import {
	CreateTopicDto,
	TopicResponseDto,
	UpdateTopicDto
} from './dto/user-topic.dto'
import {
	CreateTopicAdminDto,
	TopicResponseAdminDto,
	UpdateTopicAdminDto
} from './dto/admin-topic.dto'

@Injectable()
export class TopicUserMapper extends AbstractMapper<
	Topic,
	CreateTopicDto,
	UpdateTopicDto,
	TopicResponseDto
> {
	public toDto(
		entity: Topic & { sessionCount: number; totalFocusSecs: number }
	): TopicResponseDto {
		return plainToInstance(TopicResponseDto, {
			id: String(entity.id),
			label: entity.label,
			color: entity.color,
			parentId: entity.parentId,
			sessionCount: entity.sessionCount,
			totalFocusSecs: entity.totalFocusSecs
		})
	}

	public toCreateEntity(dto: CreateTopicDto & { userId: number }): Topic {
		return plainToInstance(Topic, {
			label: dto.label,
			color: dto.color,
			parentId: dto.parentId,
			userId: dto.userId
		})
	}

	public toUpdateEntity(entity: Topic, dto: UpdateTopicDto): Topic {
		if (dto.label !== undefined) entity.label = dto.label
		if (dto.color !== undefined) entity.color = dto.color
		if (dto.parentId !== undefined) entity.parentId = dto.parentId
		return entity
	}
}

@Injectable()
export class TopicAdminMapper extends AbstractMapper<
	Topic,
	CreateTopicAdminDto,
	UpdateTopicAdminDto,
	TopicResponseAdminDto
> {
	public toDto(
		entity: Topic & { sessionCount: number; totalFocusSecs: number }
	): TopicResponseAdminDto {
		return plainToInstance(TopicResponseAdminDto, {
			id: String(entity.id),
			label: entity.label,
			color: entity.color,
			parentId: entity.parentId,
			userId: entity.userId,
			sessionCount: entity.sessionCount,
			totalFocusSecs: entity.totalFocusSecs,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		})
	}

	public toCreateEntity(dto: CreateTopicAdminDto): Topic {
		return plainToInstance(Topic, {
			label: dto.label,
			color: dto.color,
			parentId: dto.parentId,
			userId: dto.userId
		})
	}

	public toUpdateEntity(entity: Topic, dto: UpdateTopicAdminDto): Topic {
		if (dto.label !== undefined) entity.label = dto.label
		if (dto.color !== undefined) entity.color = dto.color
		if (dto.parentId !== undefined) entity.parentId = dto.parentId
		if (dto.userId !== undefined) entity.userId = dto.userId
		return entity
	}
}

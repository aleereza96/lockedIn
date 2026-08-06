import { Injectable } from '@nestjs/common'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { plainToInstance } from 'class-transformer'
import { Edge } from './entities/edge.entity'
import { CreateEdgeDto, EdgeResponseDto, UpdateEdgeDto } from './dto/edge.dto'

@Injectable()
export class EdgeMapper extends AbstractMapper<
	Edge,
	CreateEdgeDto,
	UpdateEdgeDto,
	EdgeResponseDto
> {
	public toDto(entity: Edge): EdgeResponseDto {
		return plainToInstance(EdgeResponseDto, {
			id: String(entity.id),
			userId: entity.userId,
			fromTopicId: entity.fromTopicId,
			toTopicId: entity.toTopicId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		})
	}

	public toCreateEntity(dto: CreateEdgeDto): Edge {
		return plainToInstance(Edge, {
			userId: dto.userId,
			fromTopicId: dto.fromTopicId,
			toTopicId: dto.toTopicId
		})
	}

	public toUpdateEntity(entity: Edge, dto: UpdateEdgeDto): Edge {
		if (dto.userId !== undefined) entity.userId = dto.userId
		if (dto.fromTopicId !== undefined) entity.fromTopicId = dto.fromTopicId
		if (dto.toTopicId !== undefined) entity.toTopicId = dto.toTopicId
		return entity
	}
}

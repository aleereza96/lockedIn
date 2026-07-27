import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { DumpItem } from './entities/dump.entity'
import {
	CreateDumpItemAdminDto,
	CreateDumpItemDto
} from './dto/create-dump.dto'
import {
	DumpItemResponseDto,
	SessionDumpResponseDto
} from './dto/dump-response.dto'

@Injectable()
export class DumpsAdminMapper extends AbstractMapper<
	DumpItem,
	CreateDumpItemAdminDto,
	any,
	DumpItemResponseDto
> {
	public toDto(entity: DumpItem): DumpItemResponseDto {
		return plainToInstance(DumpItemResponseDto, {
			id: entity.id,
			sessionId: entity.sessionId,
			userId: entity.userId,
			body: entity.body,
			type: entity.type,
			createdAt: entity.createdAt
		})
	}

	public toCreateEntity(dto: CreateDumpItemAdminDto): DumpItem {
		return plainToInstance(DumpItem, {
			userId: dto.userId,
			sessionId: dto.sessionId,
			body: dto.body,
			type: dto.type
		})
	}
}

@Injectable()
export class DumpsUserMapper extends AbstractMapper<
	DumpItem,
	CreateDumpItemDto,
	any,
	SessionDumpResponseDto
> {
	public toDtoForUser(entity: DumpItem): SessionDumpResponseDto {
		return plainToInstance(SessionDumpResponseDto, {
			body: entity.body,
			type: entity.type,
			createdAt: entity.createdAt
		})
	}

	public toCreateEntityByUser(
		dto: CreateDumpItemDto,
		userId: number
	): DumpItem {
		return plainToInstance(DumpItem, {
			sessionId: dto.sessionId,
			body: dto.body,
			type: dto.type,
			userId
		})
	}
}

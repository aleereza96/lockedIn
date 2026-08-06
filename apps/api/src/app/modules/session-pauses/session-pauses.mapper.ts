import { Injectable } from '@nestjs/common'
import {
	CreateSessionPauseDto,
	SessionPauseResponseDto,
	UpdateSessionPauseDto
} from './dto/session-pause.dto'
import { SessionPause } from './entities/session-pause.entity'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class SessionPauseMapper extends AbstractMapper<
	SessionPause,
	CreateSessionPauseDto,
	UpdateSessionPauseDto,
	SessionPauseResponseDto
> {
	public toDto(entity: SessionPause): SessionPauseResponseDto {
		return plainToInstance(SessionPauseResponseDto, {
			id: String(entity.id),
			sessionId: entity.sessionId,
			pausedAt: entity.pausedAt,
			resumedAt: entity.resumedAt,
			durationSecs: entity.durationSecs,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		})
	}

	public toCreateEntity(dto: CreateSessionPauseDto): SessionPause {
		return plainToInstance(SessionPause, {
			sessionId: dto.sessionId,
			pausedAt: dto.pausedAt,
			resumedAt: dto.resumedAt,
			durationSecs: dto.durationSecs
		})
	}

	public toUpdateEntity(
		entity: SessionPause,
		dto: UpdateSessionPauseDto
	): SessionPause {
		if (dto.sessionId !== undefined) entity.sessionId = dto.sessionId
		if (dto.pausedAt !== undefined) entity.pausedAt = dto.pausedAt
		if (dto.resumedAt !== undefined) entity.resumedAt = dto.resumedAt
		if (dto.durationSecs !== undefined) entity.durationSecs = dto.durationSecs
		return entity
	}
}

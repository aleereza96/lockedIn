import { Injectable } from '@nestjs/common'
import {
	CreateSessionPauseDto,
	UpdateSessionPauseDto
} from './dto/session-pause.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionPausesRepository } from './session-pauses.repository'
import { SessionResponseDto } from '../sessions/dto/user-session.dto'
import { SessionPauseMapper } from './session-pauses.mapper'

@Injectable()
export class SessionPausesService {
	constructor(
		@InjectRepository(SessionPausesRepository)
		private readonly sessionPauseRepository: SessionPausesRepository,
		private readonly sessionPauseMapper: SessionPauseMapper
	) {}

	async create(
		createSessionPauseDto: CreateSessionPauseDto
	): Promise<SessionResponseDto> {}

	async findOne(id: number): Promise<SessionResponseDto> {}

	async update(
		id: number,
		updateSessionPauseDto: UpdateSessionPauseDto
	): Promise<SessionResponseDto> {}
}

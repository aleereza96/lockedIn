import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { SessionsRepository } from './sessions.repository'
import {
	EndSessionDto,
	SessionResponseDto,
	StartSessionDto
} from './dto/user-session.dto'
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { type PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { SessionAdminResponseDto } from './dto/admin-session.dto'

@Injectable()
export class SessionsService {
	constructor(
		@InjectRepository(SessionsRepository)
		private readonly userRepository: SessionsRepository
	) {}

	public async start(
		user: User,
		startSessionDto: StartSessionDto
	): Promise<SessionResponseDto> {}

	public async stop(
		user: User,
		endSessionDto: EndSessionDto
	): Promise<SessionResponseDto> {}

	public async pause(user: User): Promise<SessionResponseDto> {}

	public async resume(user: User): Promise<SessionResponseDto> {}

	public async getActiveSession(user: User): Promise<SessionResponseDto> {}

	public async findAll(
		pagination: PaginationRequest
	): Promise<PaginationResponseDto<SessionAdminResponseDto>> {}

	public async findOne(id: number): Promise<SessionAdminResponseDto> {}

	public async pauseById(id: number): Promise<SessionAdminResponseDto> {}

	public async remove(id: number): Promise<void> {}
}

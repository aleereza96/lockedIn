import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DumpsRepository } from './dumps.repository'
import { DumpsAdminMapper, DumpsUserMapper } from './dumps.mapper'
import {
	CreateDumpItemAdminDto,
	CreateDumpItemDto
} from './dto/create-dump.dto'
import { User } from '../users/entities/user.entity'
import {
	DumpItemResponseDto,
	SessionDumpResponseDto
} from './dto/dump-response.dto'
import { DumpsPaginationRequest } from './dumps.types'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'

@Injectable()
export class DumpsService {
	constructor(
		@InjectRepository(DumpsRepository)
		private readonly userRepository: DumpsRepository,
		private readonly userDumpMapper: DumpsUserMapper,
		private readonly adminDumpMapper: DumpsAdminMapper
	) {}

	public async createSessionDump(
		user: User,
		createSessionDumpDto: CreateDumpItemDto
	): Promise<SessionDumpResponseDto> {}

	public async findAllUserDumps(
		user: User,
		pagination: DumpsPaginationRequest
	): Promise<PaginationResponseDto<SessionDumpResponseDto>> {}

	public async findBySessionId(
		user: User,
		id: number
	): Promise<SessionDumpResponseDto> {}

	public async emptyTrash(user: User): Promise<void> {}

	public async create(
		createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {}

	public async findAll(
		pagination: DumpsPaginationRequest
	): Promise<PaginationResponseDto<DumpItemResponseDto>> {}

	public async findOne(id: number): Promise<DumpItemResponseDto> {}

	public async remove(id: number): Promise<void> {}
}

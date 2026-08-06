import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReflectionsRepository } from './reflections.repository'
import { ReflectionAdminMapper } from './reflections.mapper'
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import {
	ReflectionAdminResponseDto,
	UpdateReflectionAdminDto
} from './dto/admin-reflection.dto'

@Injectable()
export class ReflectionsService {
	constructor(
		@InjectRepository(ReflectionsRepository)
		private readonly userRepository: ReflectionsRepository,
		private readonly adminMapper: ReflectionAdminMapper
	) {}

	async findAll(
		pagination: PaginationRequest
	): Promise<PaginationResponseDto<ReflectionAdminResponseDto>> {}

	async findOne(id: number): Promise<ReflectionAdminResponseDto> {}

	async update(
		id: number,
		updateReflectionDto: UpdateReflectionAdminDto
	): Promise<ReflectionAdminResponseDto> {}

	async remove(id: number): Promise<void> {}
}

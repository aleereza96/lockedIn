import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	CreatePlanAdminDto,
	PlanResponseAdminDto,
	UpdatePlanAdminDto
} from './dto/admin-plan.dto'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PlansRepository } from './plans.repository'
import { User } from '../users/entities/user.entity'
import { PlanResponseUserDto } from './dto/user-plan.dto'
import { PlanAdminMapper, PlanUserMapper } from './plans.mapper'

@Injectable()
export class PlansService {
	constructor(
		@InjectRepository(PlansRepository)
		private readonly userRepository: PlansRepository,
		private readonly userMapper: PlanUserMapper,
		private readonly adminMapper: PlanAdminMapper
	) {}

	async choosePlan(user: User, id: number): Promise<PlanResponseUserDto> {}

	async findAllUserPlans(
		user: User,
		pagination: PaginationRequest
	): Promise<PaginationResponseDto<PlanResponseUserDto>> {}

	async createByAdmin(
		createPlanDto: CreatePlanAdminDto
	): Promise<PlanResponseAdminDto> {}

	async findAllByAdmin(
		pagination: PaginationRequest
	): Promise<PaginationResponseDto<PlanResponseAdminDto>> {}

	async findOneByAdmin(id: number): Promise<PlanResponseAdminDto> {}

	async updateByAdmin(
		id: number,
		updatePlanDto: UpdatePlanAdminDto
	): Promise<PlanResponseAdminDto> {}

	async removeByAdmin(id: number): Promise<void> {}
}

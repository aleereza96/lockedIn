import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { Plan } from './entities/plan.entity'
import { PlanResponseUserDto } from './dto/user-plan.dto'
import {
	CreatePlanAdminDto,
	PlanResponseAdminDto,
	UpdatePlanAdminDto
} from './dto/admin-plan.dto'

@Injectable()
export class PlanUserMapper extends AbstractMapper<
	Plan,
	unknown,
	unknown,
	PlanResponseUserDto
> {
	public toDto(
		entity: Plan & { sessionCount: number; totalFocusSecs: number }
	): PlanResponseUserDto {
		return plainToInstance(PlanResponseUserDto, {
			id: String(entity.id),
			name: entity.name,
			displayName: entity.displayName,
			description: entity.description
		})
	}
}

@Injectable()
export class PlanAdminMapper extends AbstractMapper<
	Plan,
	CreatePlanAdminDto,
	UpdatePlanAdminDto,
	PlanResponseAdminDto
> {
	public toDto(
		entity: Plan & { sessionCount: number; totalFocusSecs: number }
	): PlanResponseAdminDto {
		return plainToInstance(PlanResponseAdminDto, {
			id: String(entity.id),
			name: entity.name,
			displayName: entity.displayName,
			description: entity.description,
			defaultSessionSecs: entity.defaultSessionSecs,
			escalationEnabled: entity.escalationEnabled,
			escalationMinSessions: entity.escalationMinSessions,
			escalationStepPercent: entity.escalationStepPercent,
			escalationCeilingSecs: entity.escalationCeilingSecs,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		})
	}

	public toCreateEntity(dto: CreatePlanAdminDto): Plan {
		return plainToInstance(Plan, {
			name: dto.name,
			displayName: dto.displayName,
			description: dto.description,
			defaultSessionSecs: dto.defaultSessionSecs,
			escalationEnabled: dto.escalationEnabled,
			escalationMinSessions: dto.escalationMinSessions,
			escalationStepPercent: dto.escalationStepPercent,
			escalationCeilingSecs: dto.escalationCeilingSecs
		})
	}

	public toUpdateEntity(entity: Plan, dto: UpdatePlanAdminDto): Plan {
		if (dto.name !== undefined) entity.name = dto.name
		if (dto.displayName !== undefined) entity.displayName = dto.displayName
		if (dto.description !== undefined) entity.description = dto.description
		if (dto.defaultSessionSecs !== undefined)
			entity.defaultSessionSecs = dto.defaultSessionSecs
		if (dto.escalationEnabled !== undefined)
			entity.escalationEnabled = dto.escalationEnabled
		if (dto.escalationMinSessions !== undefined)
			entity.escalationMinSessions = dto.escalationMinSessions
		if (dto.escalationStepPercent !== undefined)
			entity.escalationStepPercent = dto.escalationStepPercent
		if (dto.escalationCeilingSecs !== undefined)
			entity.escalationCeilingSecs = dto.escalationCeilingSecs
		return entity
	}
}

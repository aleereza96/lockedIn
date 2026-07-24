import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleResponseDto } from './dto/role-response.dto'
import { Role } from './role.entity'
import { PermissionMapper } from '../permissions/permission.mapper'
import { Permission } from '../permissions/permission.entity'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'

@Injectable()
export class RoleMapper extends AbstractMapper<
	Role,
	CreateRoleDto,
	UpdateRoleDto,
	RoleResponseDto
> {
	constructor(private readonly permissionMapper: PermissionMapper) {
		super()
	}

	public toDto(entity: Role): RoleResponseDto {
		return plainToInstance(RoleResponseDto, {
			id: String(entity.id),
			name: entity.name,
			description: entity.description
		})
	}

	public toDtoWithRelations(entity: Role): RoleResponseDto {
		const permissions = entity.permissions
			? entity.permissions.map(this.permissionMapper.toDto)
			: []

		return plainToInstance(RoleResponseDto, {
			id: String(entity.id),
			name: entity.name,
			description: entity.description,
			permissions
		})
	}

	public toCreateEntity(dto: CreateRoleDto): Role {
		const permissions =
			dto.permissions?.map((id) => new Permission({ id: +id })) ?? []

		return plainToInstance(Role, {
			name: dto.name,
			description: dto.description,
			permissions
		})
	}

	public applyUpdate(entity: Role, dto: UpdateRoleDto): Role {
		if (dto.name !== undefined) entity.name = dto.name
		if (dto.description !== undefined) entity.description = dto.description
		if (dto.permissions !== undefined)
			entity.permissions = dto.permissions.map(
				(id) => new Permission({ id: +id })
			)

		return entity
	}
}

import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { AbstractMapper } from '../../common/interfaces/abstract-mapper.interface'
import { PermissionResponseDto } from './dto/permission-response.dto'
import { Permission } from './permission.entity'

@Injectable()
export class PermissionMapper extends AbstractMapper<
	Permission,
	undefined,
	undefined,
	PermissionResponseDto
> {
	public toDto(entity: Permission): PermissionResponseDto {
		return plainToInstance(PermissionResponseDto, {
			id: `${entity.id}`,
			slug: entity.slug,
			description: entity.description,
			active: entity.active
		})
	}
}

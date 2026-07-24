import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Permission } from './permission.entity'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'

@Injectable()
export class PermissionRepository extends AbstractRepository<Permission> {
	constructor(private dataSource: DataSource) {
		super(Permission, dataSource)
	}

	public async findAllPermissionsAndCount(
		pagination: PaginationRequest
	): Promise<[permissions: Permission[], count: number]> {
		const { page, limit, sortBy, sortOrder } = pagination
		const keyword = pagination.params?.keyword ?? undefined
		const active = pagination.params?.keyword ?? undefined

		const queryBuilder = this.createQueryBuilder('permission')
			.orderBy(`permission.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)
		let whereApplied = false

		if (keyword) {
			queryBuilder.where('permission.slug LIKE :keyword', {
				keyword: `%${keyword}%`
			})
			whereApplied = true
		}
		if (active) {
			const method = whereApplied ? 'andWhere' : 'where'
			queryBuilder[method]('permission.active = :active', { active })
		}

		return queryBuilder.getManyAndCount()
	}
}

import { Injectable } from '@nestjs/common'
import { DataSource, FindOptionsRelations } from 'typeorm'
import { Role } from './role.entity'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
	constructor(private dataSource: DataSource) {
		super(Role, dataSource)
	}

	public async findAllRolesAndCount(
		pagination: PaginationRequest
	): Promise<[roles: Role[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins } = pagination
		const keyword = pagination.params?.keyword ?? undefined

		const queryBuilder = this.createQueryBuilder('role')
			.orderBy(`role.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`role.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('role.name LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}

	public async findOneRole(id: number) {
		const relations = ['permissions'] as FindOptionsRelations<Role>
		return await this.findOne({ where: { id }, relations })
	}
}

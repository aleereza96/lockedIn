import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { Plan } from './entities/plan.entity'

@Injectable()
export class PlansRepository extends AbstractRepository<Plan> {
	constructor(private dataSource: DataSource) {
		super(Plan, dataSource)
	}

	public async findAllPlansAndCount(
		pagination: PaginationRequest
	): Promise<[plans: Plan[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins } = pagination
		const keyword = pagination.params?.keyword

		const queryBuilder = this.createQueryBuilder('plan')
			.orderBy(`plan.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`plan.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('plan.label LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}
}

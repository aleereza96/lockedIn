import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { Reflection } from './entities/reflection.entity'

@Injectable()
export class ReflectionsRepository extends AbstractRepository<Reflection> {
	constructor(private dataSource: DataSource) {
		super(Reflection, dataSource)
	}

	public async findAllReflectionsAndCount(
		pagination: PaginationRequest
	): Promise<[dumpItems: Reflection[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins } = pagination
		const keyword = pagination.params?.keyword

		const queryBuilder = this.createQueryBuilder('reflection')
			.orderBy(`reflection.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`reflection.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('reflection.body LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}
}

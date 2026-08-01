import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { Topic } from './entities/topic.entity'

@Injectable()
export class TopicsRepository extends AbstractRepository<Topic> {
	constructor(private dataSource: DataSource) {
		super(Topic, dataSource)
	}

	public async findAllTopicsAndCount(
		pagination: PaginationRequest
	): Promise<[topics: Topic[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins } = pagination
		const keyword = pagination.params?.keyword ?? undefined

		const queryBuilder = this.createQueryBuilder('topic')
			.orderBy(`topic.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`topic.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('topic.label LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}
}

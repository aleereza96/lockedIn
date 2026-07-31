import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { Session } from './entities/session.entity'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'

@Injectable()
export class SessionsRepository extends AbstractRepository<Session> {
	constructor(private dataSource: DataSource) {
		super(Session, dataSource)
	}

	public async findAllSessionsAndCount(
		pagination: PaginationRequest
	): Promise<[dumpItems: Session[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins } = pagination
		const keyword = pagination.params?.keyword

		const queryBuilder = this.createQueryBuilder('session')
			.orderBy(`session.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`session.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('session.body LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}
}

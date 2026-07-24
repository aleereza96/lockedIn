import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { User } from './entities/user.entity'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource)
	}

	public async findAllUsersAndCount(
		pagination: PaginationRequest
	): Promise<[users: User[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins } = pagination
		const keyword = pagination.params?.keyword ?? undefined

		const queryBuilder = this.createQueryBuilder('user')
			.orderBy(`user.${sortBy}`, sortOrder)
			.skip((page - 1) * limit)
			.take(limit)

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`user.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('user.username LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}
}

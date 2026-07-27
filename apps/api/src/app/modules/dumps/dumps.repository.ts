import { Injectable } from '@nestjs/common'
import { DataSource, SelectQueryBuilder } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { DumpItem } from './entities/dump.entity'
import type { DumpsPaginationRequest } from './dumps.types'

@Injectable()
export class DumpsRepository extends AbstractRepository<DumpItem> {
	constructor(private dataSource: DataSource) {
		super(DumpItem, dataSource)
	}

	public async findAllDumpItemsAndCount(
		pagination: DumpsPaginationRequest,
		userId?: number
	): Promise<[dumpItems: DumpItem[], count: number]> {
		const { page, limit, sortBy, sortOrder, joins, type } = pagination
		const keyword = pagination.params?.keyword ?? undefined

		let queryBuilder: SelectQueryBuilder<DumpItem>

		if (userId !== undefined) {
			queryBuilder = this.createQueryBuilder('dump-item')
				.where({ userId })
				.orderBy(`dump-item.${sortBy}`, sortOrder)
				.skip((page - 1) * limit)
				.take(limit)
		} else {
			queryBuilder = this.createQueryBuilder('dump-item')
				.orderBy(`dump-item.${sortBy}`, sortOrder)
				.skip((page - 1) * limit)
				.take(limit)
		}

		if (type) {
			queryBuilder.where({ type })
		}

		if (joins && joins.length) {
			const joinArray = joins.split(',')
			if (joinArray.length > 0) {
				joinArray.forEach((join) => {
					queryBuilder.leftJoinAndSelect(`dump-item.${join}`, join)
				})
			}
		}

		if (keyword) {
			queryBuilder.where('dump-item.body LIKE :keyword', {
				keyword: `%${keyword}%`
			})
		}

		return queryBuilder.getManyAndCount()
	}
}

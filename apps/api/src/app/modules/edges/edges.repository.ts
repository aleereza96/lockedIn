import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { Edge } from './entities/edge.entity'

@Injectable()
export class EdgesRepository extends AbstractRepository<Edge> {
	constructor(private dataSource: DataSource) {
		super(Edge, dataSource)
	}
}

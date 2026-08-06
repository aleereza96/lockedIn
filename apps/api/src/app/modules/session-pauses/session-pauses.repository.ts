import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractRepository } from '../../common/database/abstract.repository'
import { SessionPause } from './entities/session-pause.entity'

@Injectable()
export class SessionPausesRepository extends AbstractRepository<SessionPause> {
	constructor(private dataSource: DataSource) {
		super(SessionPause, dataSource)
	}
}

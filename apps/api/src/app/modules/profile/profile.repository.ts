import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Profile } from './profile.entity'
import { AbstractRepository } from '../../common/database/abstract.repository'

@Injectable()
export class ProfileRepository extends AbstractRepository<Profile> {
	constructor(private dataSource: DataSource) {
		super(Profile, dataSource)
	}
}

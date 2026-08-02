import { Column, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { User } from '../../users/entities/user.entity'

export class Plan extends AbstractEntity {
	@Column({ unique: true })
	name: string

	@Column({ name: 'display_name' })
	displayName: string

	@Column({ name: 'description' })
	description: string

	@Column({
		name: 'default_session_secs',
		type: 'int',
		nullable: true,
		comment:
			'Starting session length in seconds. null means user sets their own.'
	})
	defaultSessionSecs: number

	@Column({
		name: 'escalation_enabled',
		type: 'boolean',
		default: false
	})
	escalationEnabled: boolean

	@Column({
		name: 'escalation_min_sessions',
		type: 'int',
		nullable: true,
		comment: 'Minimum sessions logged before suggestions start showing.'
	})
	escalationMinSessions: number

	@Column({
		name: 'escalation_step_percent',
		type: 'int',
		nullable: true,
		comment:
			'How much longer to suggest each time, as a percentage of current average.'
	})
	escalationStepPercent: number

	@Column({
		name: 'escalation_ceiling_secs',
		type: 'int',
		nullable: true,
		comment: 'Stop suggesting beyond this duration. null means no ceiling.'
	})
	escalationCeilingSecs: number

	@OneToMany(() => User, (user) => user.plan)
	users: User[]
}

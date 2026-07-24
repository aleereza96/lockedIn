import {
	Column,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne
} from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { Profile } from '../../profile/profile.entity'
import { Role } from '../../roles/role.entity'
import { Plan } from '../../plans/entities/plan.entity'
import { Topic } from '../../topics/entities/topic.entity'
import { Session } from '../../sessions/entities/session.entity'
import { DumpItem } from '../../dumps/entities/dump.entity'

export class User extends AbstractEntity {
	@Column({ unique: true })
	username: string

	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@OneToOne(() => Profile, (profile) => profile.user)
	@JoinColumn({ name: 'profileId' })
	profile: Profile
	@Column()
	profileId: number

	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable({
		name: 'REL_USER_ROLE'
	})
	roles: Role[]

	@ManyToOne(() => Plan, (plan) => plan.users, { eager: true })
	@JoinColumn({ name: 'planId' })
	plan: Plan

	@Column()
	planId: number

	@Column({
		name: 'avg_session_secs',
		type: 'int',
		default: 0,
		comment:
			'Rolling average session length. Seeded from plan.defaultSessionSecs on registration.'
	})
	avgSessionSecs: number

	@Column({
		name: 'total_sessions',
		type: 'int',
		default: 0,
		comment:
			'Incremented on every session end. Used to check escalation eligibility.'
	})
	totalSessions: number

	@OneToMany(() => Topic, (topic) => topic.user)
	topics: Topic[]

	@OneToMany(() => Session, (session) => session.user)
	sessions: Session[]

	@OneToMany(() => DumpItem, (dumpItem) => dumpItem.user)
	dumpItems: DumpItem[]
}

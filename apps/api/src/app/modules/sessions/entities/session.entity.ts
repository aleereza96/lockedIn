import { Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { FocusRating, SessionStatus } from '../sessions.types'
import { User } from '../../users/entities/user.entity'
import { DumpItem } from '../../dumps/entities/dump.entity'
import { Topic } from '../../topics/entities/topic.entity'
import { SessionPause } from '../../session-pauses/entities/session-pause.entity'
import { Reflection } from '../../reflections/entities/reflection.entity'

export class Session extends AbstractEntity {
	@ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number

	@ManyToOne(() => Topic, (topic) => topic.sessions, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'topicId' })
	topic: Topic

	@Column()
	topicId: number

	@Column({ name: 'started_at', type: 'timestamp with time zone' })
	startedAt: Date

	@Column({
		name: 'ended_at',
		type: 'timestamp with time zone',
		nullable: true
	})
	endedAt: Date

	@Column({ name: 'duration_secs', type: 'int', default: 0 })
	durationSecs: number

	@Column({ name: 'net_focus_secs', type: 'int', default: 0 })
	netFocusSecs: number

	@Column({ name: 'target_secs', type: 'int' })
	targetSecs: number

	@Column({ name: 'hit_goal', type: 'boolean', default: false })
	hitGoal: boolean

	@Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.ACTIVE })
	status: SessionStatus

	@Column({
		name: 'auto_closed_at',
		type: 'timestamp with time zone',
		nullable: true
	})
	autoClosedAt: Date

	@Column({ type: 'text', nullable: true })
	notes: string

	@Column({
		name: 'focus_rating',
		type: 'int',
		nullable: true,
		comment: '0 = struggled, 1 = okay, 2 = deep focus'
	})
	focusRating: FocusRating

	@OneToMany(() => SessionPause, (pause) => pause.session)
	pauses: SessionPause[]

	@OneToOne(() => Reflection, (reflection) => reflection.session)
	reflection: Reflection

	@OneToMany(() => DumpItem, (dumpItem) => dumpItem.session)
	dumpItems: DumpItem[]
}

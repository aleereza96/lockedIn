import { Column, ManyToOne, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { Session } from '../../sessions/entities/session.entity'

export class SessionPause extends AbstractEntity {
	@ManyToOne(() => Session, (session) => session.pauses, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'sessionId' })
	session: Session

	@Column()
	sessionId: number

	@Column({ name: 'paused_at', type: 'timestamp with time zone' })
	pausedAt: Date

	@Column({
		name: 'resumed_at',
		type: 'timestamp with time zone',
		nullable: true
	})
	resumedAt: Date

	@Column({
		name: 'duration_secs',
		type: 'int',
		nullable: true,
		comment: 'Computed on resume or session close'
	})
	durationSecs: number
}

import { Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { Session } from '../../sessions/entities/session.entity'
import { User } from '../../users/entities/user.entity'

export class Reflection extends AbstractEntity {
	@OneToOne(() => Session, (session) => session.reflection, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'sessionId' })
	session: Session

	@Column()
	sessionId: number

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number

	@Column({ type: 'text' })
	body: string
}

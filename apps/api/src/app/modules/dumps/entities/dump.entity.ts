import { Column, ManyToOne, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { Session } from '../../sessions/entities/session.entity'
import { User } from '../../users/entities/user.entity'
import { DumpType } from '../dumps.types'

export class DumpItem extends AbstractEntity {
	@ManyToOne(() => Session, (session) => session.dumpItems, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'sessionId' })
	session: Session

	@Column()
	sessionId: number

	@ManyToOne(() => User, (user) => user.dumpItems, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number

	@Column({ type: 'text' })
	body: string

	@Column({ type: 'enum', enum: DumpType })
	type: DumpType
}

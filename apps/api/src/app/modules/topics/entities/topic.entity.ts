import { Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { User } from '../../users/entities/user.entity'
import { Session } from '../../sessions/entities/session.entity'
import { Edge } from '../../edges/entities/edge.entity'

export class Topic extends AbstractEntity {
	@Column()
	label: string

	@Column({ nullable: true })
	color: string

	@Column({ name: 'parent_id', nullable: true })
	parentId: number

	@ManyToOne(() => Topic, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'parent_id' })
	parent: Topic

	@OneToMany(() => Topic, (topic) => topic.parent)
	children: Topic[]

	@ManyToOne(() => User, (user) => user.topics, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number

	@OneToMany(() => Session, (session) => session.topic)
	sessions: Session[]

	@OneToMany(() => Edge, (edge) => edge.fromTopic)
	edgesFrom: Edge[]

	@OneToMany(() => Edge, (edge) => edge.toTopic)
	edgesTo: Edge[]
}

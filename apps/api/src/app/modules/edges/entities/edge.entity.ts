import { ManyToOne, JoinColumn, Column } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { User } from '../../users/entities/user.entity'
import { Topic } from '../../topics/entities/topic.entity'

export class Edge extends AbstractEntity {
	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number

	@ManyToOne(() => Topic, (topic) => topic.edgesFrom, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'from_topic_id' })
	fromTopic: Topic

	@Column({ name: 'from_topic_id' })
	fromTopicId: number

	@ManyToOne(() => Topic, (topic) => topic.edgesTo, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'to_topic_id' })
	toTopic: Topic

	@Column({ name: 'to_topic_id' })
	toTopicId: number
}

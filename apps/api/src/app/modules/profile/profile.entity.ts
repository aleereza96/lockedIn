import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { AbstractEntity } from '../../common/database/abstract.entity'
import { User } from '../users/entities/user.entity'

@Entity('profile')
export class Profile extends AbstractEntity {
	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	email: string

	@Column()
	avatar: string

	@OneToOne(() => User, (user) => user.profile)
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number
}

import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Permission } from '../permissions/permission.entity'
import { AbstractEntity } from '../../common/database/abstract.entity'
import { User } from '../users/entities/user.entity'

@Entity('role')
export class Role extends AbstractEntity {
	@Column()
	name: string

	@Column({ nullable: true })
	description: string

	@ManyToMany(() => User)
	users: User[]

	@ManyToMany(() => Permission)
	@JoinTable({ name: 'REL_SYSTEM_ROLE_PERMISSION' })
	permissions: Permission[]
}

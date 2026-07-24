import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { AbstractEntity } from '../../common/database/abstract.entity'
import { Role } from '../roles/role.entity'

@Entity('permission')
export class Permission extends AbstractEntity {
	@Column({
		unique: true
	})
	slug: string

	@Column()
	description: string

	@Column()
	active: boolean

	@ManyToMany(() => Role, (role) => role.permissions)
	@JoinTable({
		name: 'REL_PERMISSION_ROLE'
	})
	roles: Role[]

	constructor(permission?: Partial<Permission>) {
		super()
		Object.assign(this, permission)
	}
}

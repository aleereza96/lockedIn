import { Column, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm'
import { AbstractEntity } from '../../../common/database/abstract.entity'
import { Profile } from '../../profile/profile.entity'
import { Role } from '../../roles/role.entity'

export class User extends AbstractEntity {
	@Column()
	public username: string

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
}

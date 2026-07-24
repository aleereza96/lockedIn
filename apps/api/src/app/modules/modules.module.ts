import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './roles/role.module'
import { PermissionModule } from './permissions/permission.module'
import { ProfileModule } from './profile/profile.module'

@Module({
	imports: [
		ProfileModule,
		UsersModule,
		AuthModule,
		RoleModule,
		PermissionModule
	],
	controllers: [],
	providers: []
})
export class ModulesModule {}

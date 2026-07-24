import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './roles/role.module'
import { PermissionModule } from './permissions/permission.module'
import { ProfileModule } from './profile/profile.module'
import { SessionsModule } from './sessions/sessions.module';
import { TopicsModule } from './topics/topics.module';
import { ReflectionsModule } from './reflections/reflections.module';
import { EdgesModule } from './edges/edges.module';
import { DumpsModule } from './dumps/dumps.module';
import { SessionPausesModule } from './session-pauses/session-pauses.module';

@Module({
	imports: [
		ProfileModule,
		UsersModule,
		AuthModule,
		RoleModule,
		PermissionModule,
		SessionsModule,
		TopicsModule,
		ReflectionsModule,
		EdgesModule,
		DumpsModule,
		SessionPausesModule
	],
	controllers: [],
	providers: []
})
export class ModulesModule {}

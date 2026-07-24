import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { RoleRepository } from './role.repository'
import { RoleMapper } from './role.mapper'
import { PermissionModule } from '../permissions/permission.module'

@Module({
	imports: [TypeOrmModule.forFeature([Role]), PermissionModule],
	controllers: [RoleController],
	providers: [RoleService, RoleRepository, RoleMapper],
	exports: [TypeOrmModule, RoleService, RoleMapper]
})
export class RoleModule {}

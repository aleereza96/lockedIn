import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileModule } from '../profile/profile.module'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { UserMapper } from './users.mapper'

@Module({
	imports: [TypeOrmModule.forFeature([User]), ProfileModule],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, UserMapper],
	exports: [TypeOrmModule, UsersService, UserMapper]
})
export class UsersModule {}

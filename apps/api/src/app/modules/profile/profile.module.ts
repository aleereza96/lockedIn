import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Profile } from './profile.entity'
import { ProfileRepository } from './profile.repository'
import { ProfileMapper } from './profile.mapper'

@Module({
	imports: [TypeOrmModule.forFeature([Profile])],
	controllers: [ProfileController],
	providers: [ProfileService, ProfileRepository, ProfileMapper],
	exports: [TypeOrmModule, ProfileService, ProfileMapper]
})
export class ProfileModule {}

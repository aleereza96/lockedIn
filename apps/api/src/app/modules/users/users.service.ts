import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { UserResponseDto } from './dto/user-response.dto'
import { UserMapper } from './users.mapper'
import { HashHelper } from '../../common/helpers/hash.helper'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { Pagination } from '../../common/helpers/pagination.helper'
import { CreateProfileDto } from '../profile/dto/create-profile.dto'
import { ProfileService } from '../profile/profile.service'
import { User } from './entities/user.entity'
import { FindOptionsRelations, FindOptionsSelect } from 'typeorm'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersRepository)
		private readonly userRepository: UsersRepository,
		private readonly profileService: ProfileService,
		private readonly mapper: UserMapper
	) {}

	public async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
		let user = this.mapper.toCreateEntity(createUserDto)
		user.password = await HashHelper.encrypt(user.password)
		const profile = await this.createNewProfile()
		user.profileId = +profile.id
		user = await this.userRepository.save(user)
		return this.mapper.toDto(user)
	}

	public async findAll(pagination: PaginationRequest) {
		const [users, count] =
			await this.userRepository.findAllUsersAndCount(pagination)
		const responseDtos = users.map(this.mapper.toDto)
		return Pagination.of(pagination, count, responseDtos)
	}

	public async findOne(id: number): Promise<UserResponseDto> {
		const userEntity = await this.userRepository.findOne({ where: { id } })
		if (!userEntity) {
			throw new NotFoundException('User Not Found!')
		}

		return this.mapper.toDto(userEntity)
	}

	public async findUserByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { username },
			select: [
				'id',
				'password',
				'profile',
				'roles',
				'username'
			] as FindOptionsSelect<User>,
			relations: [
				'roles',
				'roles.permissions',
				'profile'
			] as FindOptionsRelations<User>
		})
		if (!user) {
			throw new NotFoundException('User Not Found!')
		}
		return user
	}

	public async update(
		id: number,
		updateUserDto: UpdateUserDto
	): Promise<UserResponseDto> {
		let user = await this.userRepository.findOne({ where: { id } })
		if (!user) {
			throw new NotFoundException('User Not Found!')
		}
		user = this.mapper.toUpdateEntity(user, updateUserDto)
		user = await this.userRepository.save(user)
		return this.mapper.toDto(user)
	}

	public async remove(id: number) {
		const user = await this.userRepository.findOne({ where: { id } })
		if (!user) {
			throw new NotFoundException('User Not Found!')
		}
		const profileId = +user.profileId
		await this.profileService.remove(profileId)
		return await this.userRepository.delete(user)
	}

	public async matchPassword(password: string, userPassword: string) {
		return await HashHelper.compare(password, userPassword)
	}

	private async createNewProfile() {
		const newProfileDto: CreateProfileDto = {
			firstName: '',
			lastName: '',
			email: '',
			avatar: ''
		}
		return await this.profileService.create(newProfileDto)
	}
}

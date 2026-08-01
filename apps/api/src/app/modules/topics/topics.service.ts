import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	CreateTopicAdminDto,
	TopicResponseAdminDto,
	UpdateTopicAdminDto
} from './dto/admin-topic.dto'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { TopicResponseDto } from './dto/user-topic.dto'
import { User } from '../users/entities/user.entity'
import { TopicsRepository } from './topics.repository'
import { TopicAdminMapper, TopicUserMapper } from './topics.mapper'

@Injectable()
export class TopicsService {
	constructor(
		@InjectRepository(TopicsRepository)
		private readonly userRepository: TopicsRepository,
		private readonly userMapper: TopicUserMapper,
		private readonly adminMapper: TopicAdminMapper
	) {}

	async createByUser(
		user: User,
		createTopicDto: CreateTopicAdminDto
	): Promise<TopicResponseDto> {}

	async findAllByUser(
		user: User,
		pagination: PaginationRequest
	): Promise<PaginationResponseDto<TopicResponseDto>> {}

	async findOneByUser(user: User, id: number): Promise<TopicResponseDto> {}

	async updateByUser(
		user: User,
		id: number,
		updateTopicDto: UpdateTopicAdminDto
	): Promise<TopicResponseDto> {}

	async removeByUser(user: User, id: number): Promise<void> {}

	async createByAdmin(
		createTopicDto: CreateTopicAdminDto
	): Promise<TopicResponseAdminDto> {}

	async findAllByAdmin(
		pagination: PaginationRequest
	): Promise<PaginationResponseDto<TopicResponseAdminDto>> {}

	async findOneByAdmin(id: number): Promise<TopicResponseAdminDto> {}

	async updateByAdmin(
		id: number,
		updateTopicDto: UpdateTopicAdminDto
	): Promise<TopicResponseAdminDto> {}

	async removeByAdmin(id: number): Promise<void> {}
}

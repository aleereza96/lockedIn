import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	Put,
	Request
} from '@nestjs/common'
import { TopicsService } from './topics.service'
import { AdminController } from '../../common/decorators/admin-controller.decorator'
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { Permissions } from '../permissions/decorators/permissions.decorator'
import {
	CreateTopicAdminDto,
	TopicResponseAdminDto,
	UpdateTopicAdminDto
} from './dto/admin-topic.dto'
import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { PaginationParams } from '../../common/decorators/pagination-param.decorator'
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { User } from '../users/entities/user.entity'
import {
	CreateTopicDto,
	TopicResponseDto,
	UpdateTopicDto
} from './dto/user-topic.dto'

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
	constructor(private readonly topicsService: TopicsService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new topic' })
	@ApiBody({ type: CreateTopicDto })
	@ApiGlobalResponse(TopicResponseDto)
	@UsePipes(new ValidationPipe())
	create(
		@Request() req: Request & { user: User },
		@Body() createTopicDto: CreateTopicDto
	): Promise<TopicResponseDto> {
		return this.topicsService.createByUser(req.user, createTopicDto)
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve paginated user topic list' })
	@ApiPaginatedResponse(TopicResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	findAll(
		@Request() req: Request & { user: User },
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<TopicResponseDto>> {
		return this.topicsService.findAllByUser(req.user, pagination)
	}

	@Get(':id')
	@ApiOperation({ description: 'Get user topic by id' })
	@ApiGlobalResponse(TopicResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Topic ID' })
	findOne(
		@Request() req: Request & { user: User },
		@Param('id') id: string
	): Promise<TopicResponseDto> {
		return this.topicsService.findOneByUser(req.user, +id)
	}

	@Put(':id')
	@ApiOperation({ description: 'Update user topic by id' })
	@ApiGlobalResponse(TopicResponseDto)
	@ApiBody({ type: UpdateTopicDto, description: 'New Topic Data' })
	@ApiParam({ name: 'id', type: 'number', description: 'Topic ID' })
	@UsePipes(new ValidationPipe())
	update(
		@Request() req: Request & { user: User },
		@Param('id') id: string,
		@Body() updateTopicDto: UpdateTopicDto
	): Promise<TopicResponseDto> {
		return this.topicsService.updateByUser(req.user, +id, updateTopicDto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete Topic by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Topic ID' })
	remove(@Request() req: Request & { user: User }, @Param('id') id: string) {
		return this.topicsService.removeByUser(req.user, +id)
	}
}

@ApiTags('Admin Topics')
@AdminController('topics')
export class TopicsAdminController {
	constructor(private readonly topicsService: TopicsService) {}

	@Post()
	@Permissions('admin.topics.create')
	@ApiOperation({ summary: 'Create a new topic by admin' })
	@ApiBody({ type: CreateTopicAdminDto })
	@ApiGlobalResponse(TopicResponseAdminDto)
	@UsePipes(new ValidationPipe())
	create(
		@Body() createTopicDto: CreateTopicAdminDto
	): Promise<TopicResponseAdminDto> {
		return this.topicsService.createByAdmin(createTopicDto)
	}

	@Get()
	@Permissions('admin.topics.read')
	@ApiOperation({ summary: 'Retrieve paginated topics list' })
	@ApiPaginatedResponse(TopicResponseAdminDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<TopicResponseAdminDto>> {
		return this.topicsService.findAllByAdmin(pagination)
	}

	@Get(':id')
	@Permissions('admin.topics.read')
	@ApiOperation({ description: 'Get topic by id' })
	@ApiGlobalResponse(TopicResponseAdminDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Topic ID' })
	findOne(@Param('id') id: string): Promise<TopicResponseAdminDto> {
		return this.topicsService.findOneByAdmin(+id)
	}

	@Put(':id')
	@Permissions('admin.topics.update')
	@ApiOperation({ description: 'Update topic by id' })
	@ApiGlobalResponse(TopicResponseAdminDto)
	@ApiBody({ type: UpdateTopicAdminDto, description: 'New Topic Data' })
	@ApiParam({ name: 'id', type: 'number', description: 'Topic ID' })
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateTopicDto: UpdateTopicAdminDto
	): Promise<TopicResponseAdminDto> {
		return this.topicsService.updateByAdmin(+id, updateTopicDto)
	}

	@Delete(':id')
	@Permissions('admin.topics.delete')
	@ApiOperation({ summary: 'Delete Topic by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Topic ID' })
	remove(@Param('id') id: string) {
		return this.topicsService.removeByAdmin(+id)
	}
}

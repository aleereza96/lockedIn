import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	Request,
	Put
} from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { AdminController } from '../../common/decorators/admin-controller.decorator'
import { Permissions } from '../permissions/decorators/permissions.decorator'
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { PaginationParams } from '../../common/decorators/pagination-param.decorator'
import {
	EndSessionDto,
	SessionResponseDto,
	StartSessionDto
} from './dto/user-session.dto'
import { User } from '../users/entities/user.entity'
import { SessionAdminResponseDto } from './dto/admin-session.dto'

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}
	@Post('start')
	@ApiOperation({ summary: 'Starts a new session' })
	@ApiBody({ type: StartSessionDto })
	@ApiGlobalResponse(SessionResponseDto)
	@UsePipes(new ValidationPipe())
	async start(
		@Request() req: Request & { user: User },
		@Body() startSessionDto: StartSessionDto
	): Promise<SessionResponseDto> {
		return await this.sessionsService.start(req.user, startSessionDto)
	}

	@Post('stop')
	@ApiOperation({ summary: 'Stops a session' })
	@ApiBody({ type: EndSessionDto })
	@ApiGlobalResponse(SessionResponseDto)
	@UsePipes(new ValidationPipe())
	async stop(
		@Request() req: Request & { user: User },
		@Body() endSessionDto: EndSessionDto
	): Promise<SessionResponseDto> {
		return await this.sessionsService.stop(req.user, endSessionDto)
	}

	@Post('pause')
	@ApiOperation({ summary: 'Pauses a session' })
	@ApiGlobalResponse(SessionResponseDto)
	async pause(
		@Request() req: Request & { user: User }
	): Promise<SessionResponseDto> {
		return await this.sessionsService.pause(req.user)
	}

	@Post('resume')
	@ApiOperation({ summary: 'resume the paused session' })
	@ApiGlobalResponse(SessionResponseDto)
	async resume(
		@Request() req: Request & { user: User }
	): Promise<SessionResponseDto> {
		return await this.sessionsService.pause(req.user)
	}

	@Get('active-session')
	@ApiOperation({
		description: 'Get the active session if there is not any returns null'
	})
	@ApiGlobalResponse(SessionResponseDto)
	async getActiveSession(
		@Request() req: Request & { user: User }
	): Promise<SessionResponseDto> {
		return await this.sessionsService.getActiveSession(req.user)
	}
}

@ApiTags('Admin Sessions')
@AdminController('sessions')
export class SessionsAdminController {
	constructor(private readonly sessionsService: SessionsService) {}

	@Get()
	@Permissions('admin.session.read')
	@ApiOperation({ summary: 'Retrieve paginated dumps list' })
	@ApiPaginatedResponse(SessionAdminResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'trash-1'
	})
	async findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<SessionAdminResponseDto>> {
		return await this.sessionsService.findAll(pagination)
	}

	@Get(':id')
	@Permissions('admin.session.read')
	@ApiOperation({ description: 'Get dump by id' })
	@ApiGlobalResponse(SessionAdminResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async findOne(@Param('id') id: string): Promise<SessionAdminResponseDto> {
		return await this.sessionsService.findOne(+id)
	}

	@Put(':id')
	@Permissions('admin.session.update')
	@ApiOperation({ summary: 'Pauses a session by admin' })
	@ApiGlobalResponse(SessionAdminResponseDto)
	@UsePipes(new ValidationPipe())
	async create(@Param('id') id: string): Promise<SessionAdminResponseDto> {
		return await this.sessionsService.pauseById(+id)
	}

	@Delete(':id')
	@Permissions('admin.session.delete')
	@ApiOperation({ summary: 'Delete Dump by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async remove(@Param('id') id: string) {
		return await this.sessionsService.remove(+id)
	}
}

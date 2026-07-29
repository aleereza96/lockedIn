import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { UpdateSessionDto } from './dto/update-session.dto'
import { AdminController } from '../../common/decorators/admin-controller.decorator'
import { Permissions } from '../permissions/decorators/permissions.decorator'
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger'
import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'

@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}
	@Post('start')
	@ApiOperation({ summary: 'Starts a new session' })
	@ApiBody({ type: CreateDumpItemAdminDto })
	@ApiGlobalResponse(DumpItemResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return await this.sessionsService.start(createDumpDto)
	}

	@Post('stop')
	@ApiOperation({ summary: 'Stops a session' })
	@ApiBody({ type: CreateDumpItemAdminDto })
	@ApiGlobalResponse(DumpItemResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return await this.sessionsService.stop(createDumpDto)
	}

	@Post('pause')
	@ApiOperation({ summary: 'Pauses a session' })
	@ApiBody({ type: CreateDumpItemAdminDto })
	@ApiGlobalResponse(DumpItemResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return await this.sessionsService.pause(createDumpDto)
	}

	@Post('resume')
	@ApiOperation({ summary: 'resume the paused session' })
	@ApiBody({ type: CreateDumpItemAdminDto })
	@ApiGlobalResponse(DumpItemResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return await this.sessionsService.pause(createDumpDto)
	}

	@Get('active-session')
	@ApiOperation({
		description: 'Get the active session if there is not any returns null'
	})
	@ApiGlobalResponse(DumpItemResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async findOne(@Param('id') id: string): Promise<DumpItemResponseDto> {
		return await this.sessionsService.findOne(+id)
	}
}

@AdminController('sessions')
export class SessionsAdminController {
	constructor(private readonly sessionsService: SessionsService) {}

	@Get()
	@Permissions('admin.session.read')
	@ApiOperation({ summary: 'Retrieve paginated dumps list' })
	@ApiPaginatedResponse(DumpItemResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'trash-1'
	})
	async findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<DumpItemResponseDto>> {
		return await this.sessionsService.findAll(pagination)
	}

	@Get(':id')
	@Permissions('admin.session.read')
	@ApiOperation({ description: 'Get dump by id' })
	@ApiGlobalResponse(DumpItemResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async findOne(@Param('id') id: string): Promise<DumpItemResponseDto> {
		return await this.sessionsService.findOne(+id)
	}

	@Post('pause')
	@Permissions('admin.session.update')
	@ApiOperation({ summary: 'Pauses a session by admin' })
	@ApiBody({ type: CreateDumpItemAdminDto })
	@ApiGlobalResponse(DumpItemResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return await this.sessionsService.pause(createDumpDto)
	}

	@Delete(':id')
	@Permissions('admin.session.delete')
	@ApiOperation({ summary: 'Delete Dump by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async remove(@Param('id') id: string) {
		return await this.sessionsService.remove(+id)
	}
}

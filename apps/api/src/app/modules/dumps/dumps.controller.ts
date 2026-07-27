import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	Request
} from '@nestjs/common'
import { DumpsService } from './dumps.service'
import {
	CreateDumpItemDto,
	CreateDumpItemAdminDto
} from './dto/create-dump.dto'
import {
	DumpItemResponseDto,
	SessionDumpResponseDto
} from './dto/dump-response.dto'
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { AdminController } from '../../common/decorators/admin-controller.decorator'
import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { Permissions } from '../permissions/decorators/permissions.decorator'
import { User } from '../users/entities/user.entity'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { PaginationParams } from '../../common/decorators/pagination-param.decorator'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import type { DumpsPaginationRequest } from './dumps.types'

@ApiTags('Dumps')
@Controller('dumps')
export class DumpsController {
	constructor(private readonly dumpsService: DumpsService) {}

	@Post()
	@ApiOperation({ summary: 'Creates a new dump' })
	@ApiBody({ type: CreateDumpItemDto })
	@ApiGlobalResponse(SessionDumpResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Request() req: Request & { user: User },
		@Body() createDumpDto: CreateDumpItemDto
	): Promise<SessionDumpResponseDto> {
		return await this.dumpsService.create(req.user, createDumpDto)
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve paginated dumps list of the user' })
	@ApiPaginatedResponse(SessionDumpResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'trash-1'
	})
	async findAll(
		@Request() req: Request & { user: User },
		@PaginationParams() pagination: DumpsPaginationRequest
	): Promise<PaginationResponseDto<SessionDumpResponseDto>> {
		return await this.dumpsService.findAll(req.user, pagination)
	}

	@Get(':sessionId')
	@ApiOperation({ description: 'Get dump by session id' })
	@ApiGlobalResponse(SessionDumpResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Session ID' })
	async findOne(
		@Request() req: Request & { user: User },
		@Param('sessionId') id: string
	): Promise<SessionDumpResponseDto> {
		return await this.dumpsService.findBySessionId(req.user, +id)
	}

	@Delete('empty-trash')
	@ApiOperation({ summary: 'Empty trash dumps ' })
	async remove(@Request() req: Request & { user: User }): Promise<void> {
		return await this.dumpsService.emptyTrash(req.user)
	}
}

@ApiTags('Admin Dumps')
@AdminController('dumps')
export class DumpsAdminController {
	constructor(private readonly dumpsService: DumpsService) {}

	@Post()
	@Permissions('admin.dumps.create')
	@ApiOperation({ summary: 'Creates a new dump by admin' })
	@ApiBody({ type: CreateDumpItemAdminDto })
	@ApiGlobalResponse(DumpItemResponseDto)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return await this.dumpsService.create(createDumpDto)
	}

	@Get()
	@Permissions('admin.dumps.read')
	@ApiOperation({ summary: 'Retrieve paginated dumps list' })
	@ApiPaginatedResponse(DumpItemResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'trash-1'
	})
	async findAll(
		@PaginationParams() pagination: DumpsPaginationRequest
	): Promise<PaginationResponseDto<DumpItemResponseDto>> {
		return await this.dumpsService.findAll(pagination)
	}

	@Get(':id')
	@Permissions('admin.dumps.read')
	@ApiOperation({ description: 'Get dump by id' })
	@ApiGlobalResponse(DumpItemResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async findOne(@Param('id') id: string): Promise<DumpItemResponseDto> {
		return await this.dumpsService.findOne(+id)
	}

	@Delete(':id')
	@Permissions('admin.dumps.delete')
	@ApiOperation({ summary: 'Delete Dump by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async remove(@Param('id') id: string) {
		return await this.dumpsService.remove(+id)
	}
}

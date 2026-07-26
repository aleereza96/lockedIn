import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
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
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'

@ApiTags('Dumps')
@Controller('dumps')
export class DumpsController {
	constructor(private readonly dumpsService: DumpsService) {}

	@Post()
	@ApiOperation({ summary: 'Creates a new dump' })
	@ApiBody({ type: CreateDumpItemDto })
	@ApiGlobalResponse(SessionDumpResponseDto)
	@UsePipes(new ValidationPipe())
	create(
		@Request() req: Request & { user: User },
		@Body() createDumpDto: CreateDumpItemDto
	): Promise<SessionDumpResponseDto> {
		return this.dumpsService.create(req.user, createDumpDto)
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve paginated dumps list of the user' })
	@ApiPaginatedResponse(SessionDumpResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<SessionDumpResponseDto>> {
		return this.dumpsService.findAll(pagination)
	}

	@Get(':sessionId')
	@ApiOperation({ description: 'Get dump by session id' })
	@ApiGlobalResponse(SessionDumpResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Session ID' })
	findOne(@Param('sessionId') id: string): Promise<SessionDumpResponseDto> {
		return this.dumpsService.findBySessionId(+id)
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
	create(
		@Body() createDumpDto: CreateDumpItemAdminDto
	): Promise<DumpItemResponseDto> {
		return this.dumpsService.create(createDumpDto)
	}

	@Get()
	@Permissions('admin.dumps.read')
	@ApiOperation({ summary: 'Retrieve paginated dumps list' })
	@ApiPaginatedResponse(DumpItemResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<DumpItemResponseDto>> {
		return this.dumpsService.findAll(pagination)
	}

	@Get(':id')
	@Permissions('admin.dumps.read')
	@ApiOperation({ description: 'Get dump by id' })
	@ApiGlobalResponse(DumpItemResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	findOne(@Param('id') id: string): Promise<DumpItemResponseDto> {
		return this.dumpsService.findOne(+id)
	}

	@Delete(':id')
	@Permissions('admin.dumps.delete')
	@ApiOperation({ summary: 'Delete Dump by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	remove(@Param('id') id: string) {
		return this.dumpsService.remove(+id)
	}
}

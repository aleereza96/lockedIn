import {
	Get,
	Body,
	Param,
	Delete,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReflectionsService } from './reflections.service'
import {
	ReflectionAdminResponseDto,
	UpdateReflectionAdminDto
} from './dto/admin-reflection.dto'
import { AdminController } from '../../common/decorators/admin-controller.decorator'
import { Permissions } from '../permissions/decorators/permissions.decorator'
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { PaginationParams } from '../../common/decorators/pagination-param.decorator'
import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import type { PaginationRequest } from '../../common/interfaces/pagination.interface'

@ApiTags('Admin Reflections')
@AdminController('reflections')
export class ReflectionsController {
	constructor(private readonly reflectionsService: ReflectionsService) {}

	@Get()
	@Permissions('admin.reflection.read')
	@ApiOperation({ summary: 'Retrieve paginated reflections list' })
	@ApiPaginatedResponse(ReflectionAdminResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'trash-1'
	})
	async findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<ReflectionAdminResponseDto>> {
		return await this.reflectionsService.findAll(pagination)
	}

	@Get(':id')
	@Permissions('admin.reflection.read')
	@ApiOperation({ description: 'Get reflection by id' })
	@ApiGlobalResponse(ReflectionAdminResponseDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async findOne(@Param('id') id: string): Promise<ReflectionAdminResponseDto> {
		return await this.reflectionsService.findOne(+id)
	}

	@Put(':id')
	@Permissions('admin.topics.update')
	@ApiOperation({ description: 'Update topic by id' })
	@ApiGlobalResponse(ReflectionAdminResponseDto)
	@ApiBody({
		type: UpdateReflectionAdminDto,
		description: 'New Reflection Data'
	})
	@ApiParam({ name: 'id', type: 'number', description: 'Reflection ID' })
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateReflectionDto: UpdateReflectionAdminDto
	): Promise<ReflectionAdminResponseDto> {
		return this.reflectionsService.update(+id, updateReflectionDto)
	}

	@Delete(':id')
	@Permissions('admin.reflection.delete')
	@ApiOperation({ summary: 'Delete Dump by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Dump ID' })
	async remove(@Param('id') id: string) {
		return await this.reflectionsService.remove(+id)
	}
}

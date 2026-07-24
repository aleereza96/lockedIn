import { Controller, Get } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { PermissionResponseDto } from './dto/permission-response.dto'
import { ApiOperation, ApiQuery } from '@nestjs/swagger'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { PaginationParams } from '../../common/decorators/pagination-param.decorator'

@Controller('permission')
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Get()
	@ApiOperation({ summary: 'Retrieve paginated permissions list' })
	@ApiPaginatedResponse(PermissionResponseDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	@ApiQuery({
		name: 'active',
		type: 'boolean',
		required: false,
		example: 'true'
	})
	findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<PermissionResponseDto>> {
		return this.permissionService.findAll(pagination)
	}
}

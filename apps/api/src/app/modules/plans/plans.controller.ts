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
import { PlansService } from './plans.service'
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { AdminController } from '../../common/decorators/admin-controller.decorator'
import { Permissions } from '../permissions/decorators/permissions.decorator'
import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator'
import { User } from '../users/entities/user.entity'
import { type PaginationRequest } from '../../common/interfaces/pagination.interface'
import { PaginationParams } from '../../common/decorators/pagination-param.decorator'
import { PaginationResponseDto } from '../../common/interfaces/pagination-response.interface'
import { PlanResponseUserDto } from './dto/user-plan.dto'
import {
	CreatePlanAdminDto,
	PlanResponseAdminDto,
	UpdatePlanAdminDto
} from './dto/admin-plan.dto'

@ApiTags('Plan')
@Controller('plans')
export class PlanController {
	constructor(private readonly plansService: PlansService) {}

	@Post(':id')
	@ApiOperation({ summary: 'choose a new plan' })
	@ApiGlobalResponse(PlanResponseUserDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Plan ID' })
	public async create(
		@Request() req: Request & { user: User },
		@Param('id') id: string
	): Promise<PlanResponseUserDto> {
		return await this.plansService.choosePlan(req.user, +id)
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve paginated user plan list' })
	@ApiPaginatedResponse(PlanResponseUserDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	public async findAll(
		@Request() req: Request & { user: User },
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<PlanResponseUserDto>> {
		return await this.plansService.findAllUserPlans(req.user, pagination)
	}
}

@ApiTags('Admin Plan')
@AdminController('plans')
export class PlanAdminController {
	constructor(private readonly plansService: PlansService) {}

	@Post()
	@Permissions('admin.plans.create')
	@ApiOperation({ summary: 'Create a new plan by admin' })
	@ApiBody({ type: CreatePlanAdminDto })
	@ApiGlobalResponse(PlanResponseAdminDto)
	@UsePipes(new ValidationPipe())
	public async xcreate(
		@Body() createPlanDto: CreatePlanAdminDto
	): Promise<PlanResponseAdminDto> {
		return await this.plansService.createByAdmin(createPlanDto)
	}

	@Get()
	@Permissions('admin.plans.read')
	@ApiOperation({ summary: 'Retrieve paginated plans list' })
	@ApiPaginatedResponse(PlanResponseAdminDto)
	@ApiQuery({
		name: 'keyword',
		type: 'string',
		required: false,
		example: 'admin'
	})
	public async findAll(
		@PaginationParams() pagination: PaginationRequest
	): Promise<PaginationResponseDto<PlanResponseAdminDto>> {
		return await this.plansService.findAllByAdmin(pagination)
	}

	@Get(':id')
	@Permissions('admin.plans.read')
	@ApiOperation({ description: 'Get plan by id' })
	@ApiGlobalResponse(PlanResponseAdminDto)
	@ApiParam({ name: 'id', type: 'number', description: 'Plan ID' })
	public async findOne(@Param('id') id: string): Promise<PlanResponseAdminDto> {
		return await this.plansService.findOneByAdmin(+id)
	}

	@Put(':id')
	@Permissions('admin.plans.update')
	@ApiOperation({ description: 'Update plan by id' })
	@ApiGlobalResponse(PlanResponseAdminDto)
	@ApiBody({ type: UpdatePlanAdminDto, description: 'New Plan Data' })
	@ApiParam({ name: 'id', type: 'number', description: 'Plan ID' })
	@UsePipes(new ValidationPipe())
	public async update(
		@Param('id') id: string,
		@Body() updatePlanDto: UpdatePlanAdminDto
	): Promise<PlanResponseAdminDto> {
		return await this.plansService.updateByAdmin(+id, updatePlanDto)
	}

	@Delete(':id')
	@Permissions('admin.plans.delete')
	@ApiOperation({ summary: 'Delete Plan by ID' })
	@ApiParam({ name: 'id', type: 'number', description: 'Plan ID' })
	public async remove(@Param('id') id: string): Promise<void> {
		return await this.plansService.removeByAdmin(+id)
	}
}

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator'

export class CreatePlanAdminDto {
	@ApiProperty({
		type: String,
		required: true,
		description: 'Name of the plan'
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		type: String,
		required: true,
		description: 'Display name of the plan'
	})
	@IsString()
	@IsNotEmpty()
	displayName: string

	@ApiProperty({
		type: String,
		required: true,
		description: 'Description of the plan'
	})
	@IsString()
	@IsNotEmpty()
	description: string

	@ApiPropertyOptional({
		type: Number,
		description:
			'Starting session length in seconds. null means user sets their own.'
	})
	@IsNumber()
	@IsNotEmpty()
	defaultSessionSecs: number

	@ApiPropertyOptional({
		type: Boolean,
		description: ''
	})
	@IsBoolean()
	@IsNotEmpty()
	escalationEnabled: boolean

	@ApiPropertyOptional({
		type: Number,
		description: 'Minimum sessions logged before suggestions start showing.'
	})
	@IsNumber()
	@IsNotEmpty()
	escalationMinSessions: number

	@ApiPropertyOptional({
		type: Number,
		description:
			'How much longer to suggest each time, as a percentage of current average.'
	})
	@IsNumber()
	@IsNotEmpty()
	escalationStepPercent: number

	@ApiPropertyOptional({
		type: Number,
		description: 'Stop suggesting beyond this duration. null means no ceiling.'
	})
	@IsNumber()
	@IsNotEmpty()
	escalationCeilingSecs: number
}

export class UpdatePlanAdminDto extends PartialType(CreatePlanAdminDto) {}

export class PlanResponseAdminDto {
	@ApiProperty({ type: Number, description: 'ID of the plan' })
	id: number

	@ApiProperty({ type: String, description: 'Name of the plan' })
	name: string

	@ApiProperty({ type: String, description: 'Display name of the plan' })
	displayName: string

	@ApiProperty({ type: String, description: 'Description of the plan' })
	description: string

	@ApiPropertyOptional({
		type: Number,
		description:
			'Starting session length in seconds. null means user sets their own.'
	})
	defaultSessionSecs: number

	@ApiProperty({
		type: Boolean,
		description: ''
	})
	escalationEnabled: boolean

	@ApiProperty({
		type: Number,
		description: 'Minimum sessions logged before suggestions start showing.'
	})
	escalationMinSessions: number

	@ApiProperty({
		type: Number,
		description:
			'How much longer to suggest each time, as a percentage of current average.'
	})
	escalationStepPercent: number

	@ApiProperty({
		type: Number,
		description: 'Stop suggesting beyond this duration. null means no ceiling.'
	})
	escalationCeilingSecs: number

	@ApiProperty({ type: String, description: 'Creation timestamp' })
	createdAt: Date

	@ApiProperty({ type: String, description: 'Update timestamp' })
	updatedAt: Date
}

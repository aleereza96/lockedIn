import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsString,
	IsOptional,
	IsHexColor,
	IsNumber
} from 'class-validator'

export class CreateTopicAdminDto {
	@ApiProperty({
		type: Number,
		required: true,
		description: 'ID of the user this topic belongs to'
	})
	@IsNumber()
	@IsNotEmpty()
	userId: number

	@ApiProperty({
		type: String,
		required: true,
		description: 'Label of the topic — shown on the graph node'
	})
	@IsString()
	@IsNotEmpty()
	label: string

	@ApiPropertyOptional({
		type: String,
		description: 'Hex color for the topic cluster (e.g. #7C6FE8)'
	})
	@IsOptional()
	@IsHexColor()
	color?: string

	@ApiPropertyOptional({
		type: Number,
		description: 'ID of the parent topic for hierarchy (e.g. Physics → Waves)'
	})
	@IsOptional()
	@IsNumber()
	parentId?: number
}

export class UpdateTopicAdminDto {
	@ApiProperty({
		type: Number,
		required: true,
		description: 'ID of the user this topic belongs to'
	})
	@IsNumber()
	@IsNotEmpty()
	userId: number

	@ApiPropertyOptional({ type: String, description: 'Updated label' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	label?: string

	@ApiPropertyOptional({ type: String, description: 'Updated hex color' })
	@IsOptional()
	@IsHexColor()
	color?: string

	@ApiPropertyOptional({ type: Number, description: 'Updated parent topic ID' })
	@IsOptional()
	@IsNumber()
	parentId?: number
}

export class TopicResponseAdminDto {
	@ApiProperty({ type: Number, description: 'ID of the topic' })
	id: number

	@ApiProperty({ type: String, description: 'Label of the topic' })
	label: string

	@ApiPropertyOptional({ type: String, description: 'Hex color' })
	color: string

	@ApiPropertyOptional({ type: Number, description: 'Parent topic ID' })
	parentId: number

	@ApiProperty({ type: Number, description: 'Owner user ID' })
	userId: number

	@ApiProperty({ type: Number, description: 'Total number of sessions logged' })
	sessionCount: number

	@ApiProperty({
		type: Number,
		description: 'Total focus time in seconds across all sessions'
	})
	totalFocusSecs: number

	@ApiProperty({ type: String, description: 'Creation timestamp' })
	createdAt: Date

	@ApiProperty({ type: String, description: 'Update timestamp' })
	updatedAt: Date
}

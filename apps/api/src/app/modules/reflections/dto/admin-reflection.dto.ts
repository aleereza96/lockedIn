import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateReflectionAdminDto {
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
	body?: string

	@ApiPropertyOptional({ type: Number, description: 'Session ID' })
	@IsOptional()
	@IsNumber()
	sessionId?: number
}

export class ReflectionAdminResponseDto {
	@ApiProperty({ type: Number, description: 'ID of the reflection' })
	id: number

	@ApiProperty({ type: Number, description: 'Session ID' })
	sessionId: number

	@ApiProperty({ type: Number, description: 'Owner user ID' })
	userId: number

	@ApiProperty({ type: String, description: 'Reflection text body' })
	body: string

	@ApiProperty({ type: String, description: 'Creation timestamp' })
	createdAt: Date
}

import { ApiProperty } from '@nestjs/swagger'

export class PlanResponseUserDto {
	@ApiProperty({ type: Number, description: 'ID of the plan' })
	id: number

	@ApiProperty({ type: String, description: 'Name of the plan' })
	name: string

	@ApiProperty({ type: String, description: 'Display name of the plan' })
	displayName: string

	@ApiProperty({ type: String, description: 'Description of the plan' })
	description: string
}

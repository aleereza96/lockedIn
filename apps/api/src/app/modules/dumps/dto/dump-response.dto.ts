import { ApiProperty } from '@nestjs/swagger'
import { DumpType } from '../dumps.enums'

export class DumpItemResponseDto {
	@ApiProperty({ type: Number, description: 'ID of the dump item' })
	id: number

	@ApiProperty({ type: Number, description: 'Parent session ID' })
	sessionId: number

	@ApiProperty({ type: Number, description: 'Owner user ID' })
	userId: number

	@ApiProperty({ type: String, description: 'The parked thought' })
	body: string

	@ApiProperty({ enum: DumpType, description: 'trash or save' })
	type: DumpType

	@ApiProperty({ type: String, description: 'Creation timestamp' })
	createdAt: Date
}

export class SessionDumpResponseDto {
	@ApiProperty({ type: String, description: 'The parked thought' })
	body: string

	@ApiProperty({ enum: DumpType, description: 'trash or save' })
	type: DumpType

	@ApiProperty({ type: String, description: 'Creation timestamp' })
	createdAt: Date
}

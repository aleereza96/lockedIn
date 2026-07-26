import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum } from 'class-validator'
import { DumpType } from '../dumps.enums'

export class CreateDumpItemDto {
	@ApiProperty({
		type: String,
		required: true,
		description: 'The distracting thought the user wants to park'
	})
	@IsString()
	@IsNotEmpty()
	body: string

	@ApiProperty({
		enum: DumpType,
		required: true,
		description: 'trash — discard after session | save — review after session'
	})
	@IsEnum(DumpType)
	@IsNotEmpty()
	type: DumpType
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator'
import { DumpType } from '../dumps.enums'

export class CreateDumpItemDto {
	@ApiProperty({
		type: Number,
		required: true,
		description: 'The Id of the session'
	})
	@IsNumber()
	@IsNotEmpty()
	sessionId: number

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

export class CreateDumpItemAdminDto {
	@ApiProperty({
		type: Number,
		required: true,
		description: 'The Id of the user'
	})
	@IsNumber()
	@IsNotEmpty()
	userId: number

	@ApiProperty({
		type: Number,
		required: true,
		description: 'The Id of the session'
	})
	@IsNumber()
	@IsNotEmpty()
	sessionId: number

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

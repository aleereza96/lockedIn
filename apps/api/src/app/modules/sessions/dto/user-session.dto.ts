import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsEnum,
	IsDate
} from 'class-validator'
import { FocusRating, SessionStatus } from '../sessions.types'

export class StartSessionDto {
	@ApiProperty({
		type: Number,
		required: true,
		description: 'ID of the topic this session belongs to'
	})
	@IsNumber()
	@IsNotEmpty()
	topicId: number

	@ApiProperty({
		type: Date,
		required: true,
		description: 'The time that session has started '
	})
	@IsNumber()
	@IsDate()
	@IsNotEmpty()
	startedAt: Date

	@ApiProperty({
		type: Number,
		required: false,
		description: 'Session goal length in seconds (e.g. 1500 for 25 min)'
	})
	@IsNumber()
	targetSecs: number
}

export class EndSessionDto {
	@ApiProperty({
		type: String,
		required: true,
		description: 'The time that session has ended '
	})
	@IsNumber()
	@IsDate()
	@IsNotEmpty()
	endedAt: Date

	@ApiProperty({
		enum: SessionStatus,
		description:
			'completed — user ended it manually | saved — auto-closed after inactivity'
	})
	@IsEnum(SessionStatus)
	@IsNotEmpty()
	status: SessionStatus

	@ApiPropertyOptional({
		type: String,
		description: 'Free-form notes taken during the session'
	})
	@IsOptional()
	@IsString()
	notes?: string
}

export class UpdateSessionNotesDto {
	@ApiProperty({
		type: String,
		required: true,
		description: 'In-session notes to persist mid-session'
	})
	@IsString()
	@IsNotEmpty()
	notes: string
}

export class SessionResponseDto {
	@ApiProperty({ type: Number, description: 'ID of the session' })
	id: number

	@ApiProperty({ type: Number, description: 'Topic ID' })
	topicId: number

	@ApiProperty({ type: String, description: 'Session start timestamp' })
	startedAt: Date

	@ApiPropertyOptional({ type: String, description: 'Session end timestamp' })
	endedAt: Date

	@ApiProperty({ type: Number, description: 'Total duration in seconds' })
	durationSecs: number

	@ApiProperty({ type: Number, description: 'Net focus time in seconds' })
	netFocusSecs: number

	@ApiProperty({ type: Number, description: 'Target duration in seconds' })
	targetSecs: number

	@ApiProperty({
		type: Boolean,
		description: 'Whether the user hit their goal'
	})
	hitGoal: boolean

	@ApiProperty({ enum: SessionStatus, description: 'Session status' })
	status: SessionStatus

	@ApiPropertyOptional({ type: String, description: 'Session notes' })
	notes: string

	@ApiPropertyOptional({
		enum: FocusRating,
		description: '0 = struggled, 1 = okay, 2 = deep focus'
	})
	focusRating: FocusRating
}

import { ApiProperty } from '@nestjs/swagger'
import { FocusRating, SessionStatus } from '../sessions.types'

export class SessionAdminResponseDto {
	@ApiProperty({ type: Number, description: 'ID of the session' })
	id: number

	@ApiProperty({ type: Number, description: 'Topic ID' })
	topicId: number

	@ApiProperty({ type: Number, description: 'Owner user ID' })
	userId: number

	@ApiProperty({ type: String, description: 'Session start timestamp' })
	startedAt: Date

	@ApiProperty({ type: String, description: 'Session end timestamp' })
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

	@ApiProperty({ type: String, description: 'Session notes' })
	notes: string

	@ApiProperty({
		enum: FocusRating,
		description: '0 = struggled, 1 = okay, 2 = deep focus'
	})
	focusRating: FocusRating

	@ApiProperty({ type: String, description: 'Creation timestamp' })
	createdAt: Date
}

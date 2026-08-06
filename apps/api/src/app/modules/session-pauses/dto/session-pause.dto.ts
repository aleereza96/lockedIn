import { PartialType } from '@nestjs/swagger'

export class CreateSessionPauseDto {
	sessionId: number
	pausedAt: Date
	resumedAt: Date
	durationSecs: number
}

export class UpdateSessionPauseDto extends PartialType(CreateSessionPauseDto) {}

export class SessionPauseResponseDto extends CreateSessionPauseDto {
	id: string
	createdAt: string
	updatedAt: string
}

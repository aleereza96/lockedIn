import { PartialType } from '@nestjs/swagger'

export class CreateEdgeDto {
	userId: number
	fromTopicId: number
	toTopicId: number
}

export class UpdateEdgeDto extends PartialType(CreateEdgeDto) {}

export class EdgeResponseDto extends CreateEdgeDto {
	id: string
	createdAt: string
	updatedAt: string
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EdgesRepository } from './edges.repository'
import { EdgeMapper } from './edges.mapper'
import { CreateEdgeDto, EdgeResponseDto, UpdateEdgeDto } from './dto/edge.dto'

@Injectable()
export class EdgesService {
	constructor(
		@InjectRepository(EdgesRepository)
		private readonly sessionPauseRepository: EdgesRepository,
		private readonly sessionPauseMapper: EdgeMapper
	) {}

	async create(createEdgeDto: CreateEdgeDto): Promise<EdgeResponseDto> {}

	async findOne(id: number): Promise<EdgeResponseDto> {}

	async update(
		id: number,
		updateEdgeDto: UpdateEdgeDto
	): Promise<EdgeResponseDto> {}

	async remove(id: number): Promise<void> {}
}

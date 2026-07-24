export abstract class AbstractMapper<
	Entity,
	CreateDto,
	UpdateDto,
	ResponseDto
> {
	toDto?(entity: Entity): ResponseDto
	toCreateEntity?(dto: CreateDto): Entity
	toDtoWithRelations?(entity: Entity): Promise<ResponseDto> | ResponseDto
	applyUpdate?(entity: Entity, dto: UpdateDto): Entity
}

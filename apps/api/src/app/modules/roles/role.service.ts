import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleRepository } from './role.repository'
import { RoleMapper } from './role.mapper'
import { RoleResponseDto } from './dto/role-response.dto'
import { PaginationRequest } from '../../common/interfaces/pagination.interface'
import { Pagination } from '../../common/helpers/pagination.helper'

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(RoleRepository)
		private readonly roleRepository: RoleRepository,
		private readonly mapper: RoleMapper
	) {}

	public async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
		let role = this.mapper.toCreateEntity(createRoleDto)

		role = await this.roleRepository.save(role)
		return this.mapper.toDto(role)
	}

	public async findAll(pagination: PaginationRequest) {
		const [roles, count] =
			await this.roleRepository.findAllRolesAndCount(pagination)

		const responseDtos = roles.map(this.mapper.toDto)
		return Pagination.of(pagination, count, responseDtos)
	}

	public async findOne(id: number): Promise<RoleResponseDto> {
		const roleEntity = await this.roleRepository.findOneRole(id)
		if (!roleEntity) {
			throw new NotFoundException('Role Not Found!')
		}

		return this.mapper.toDto(roleEntity)
	}

	public async update(
		id: number,
		updateRoleDto: UpdateRoleDto
	): Promise<RoleResponseDto> {
		let role = await this.roleRepository.findOneRole(id)
		if (!role) {
			throw new NotFoundException('Role Not Found!')
		}
		role = this.mapper.applyUpdate(role, updateRoleDto)
		role = await this.roleRepository.save(role)
		return this.mapper.toDto(role)
	}

	public async remove(id: number) {
		const role = await this.roleRepository.findOne({ where: { id } })
		if (!role) {
			throw new NotFoundException('Role Not Found!')
		}
		return await this.roleRepository.delete(role)
	}
}

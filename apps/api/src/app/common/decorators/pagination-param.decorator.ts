import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { DefaultPagination } from '../interfaces/default-pagination.interface'

export const PaginationParams = createParamDecorator(
	(
		data: DefaultPagination = {
			defaultPage: 1,
			defaultLimit: 10,
			defaultSortBy: 'id',
			defaultSortOrder: 'ASC'
		},
		ctx: ExecutionContext
	) => {
		const {
			query: { page, limit, sortBy, sortOrder, joins, ...params }
		} = ctx.switchToHttp().getRequest()

		const { defaultPage, defaultLimit, defaultSortBy, defaultSortOrder } = data

		const numericLimit = Number(limit) > 0 ? Number(limit) : defaultLimit
		const numericPage = Number(page) > 0 ? Number(page) : defaultPage

		const cleanSortOrder = ['ASC', 'DESC'].includes(
			String(sortOrder).toUpperCase()
		)
			? String(sortOrder).toUpperCase()
			: defaultSortOrder

		const order = { [sortBy || defaultSortBy]: cleanSortOrder }

		return {
			...data,
			page: numericPage,
			limit: numericLimit,
			order,
			joins,
			params
		}
	}
)

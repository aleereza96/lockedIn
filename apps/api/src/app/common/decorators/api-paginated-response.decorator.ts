import { applyDecorators, Type } from '@nestjs/common'
import {
	ApiOkResponse,
	getSchemaPath,
	ApiExtraModels,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiInternalServerErrorResponse,
	ApiQuery
} from '@nestjs/swagger'
import { PaginationResponseDto } from '../interfaces/pagination-response.interface'
import { GeneralResponseDto } from '../interfaces/general-response.interface'

export const ApiPaginatedResponse = <TModel extends Type<any>>(
	model: TModel
) => {
	return applyDecorators(
		ApiQuery({ name: 'sortBy', type: 'String', required: false }),
		ApiQuery({
			name: 'sortOrder',
			enum: ['ASC', 'DESC'],
			required: false
		}),
		ApiQuery({ name: 'page', type: 'number', required: false, example: '1' }),
		ApiQuery({ name: 'limit', type: 'number', required: false, example: '20' }),
		ApiExtraModels(PaginationResponseDto, model),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(GeneralResponseDto) },
					{
						properties: {
							payload: {
								allOf: [
									{ $ref: getSchemaPath(PaginationResponseDto) },
									{
										properties: {
											content: {
												type: 'array',
												items: { $ref: getSchemaPath(model) }
											}
										}
									}
								]
							},
							timestamp: {
								type: 'number'
							}
						}
					}
				]
			}
		}),
		ApiUnauthorizedResponse({ description: 'Not authenticated' }),
		ApiForbiddenResponse({ description: 'Access denied' }),
		ApiNotFoundResponse({ description: 'Not found' }),
		ApiInternalServerErrorResponse({ description: 'Server error' })
	)
}

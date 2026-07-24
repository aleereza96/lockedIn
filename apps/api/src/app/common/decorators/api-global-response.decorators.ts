import { applyDecorators, Type } from '@nestjs/common'
import {
	ApiOkResponse,
	getSchemaPath,
	ApiExtraModels,
	ApiNotFoundResponse,
	ApiForbiddenResponse,
	ApiUnauthorizedResponse,
	ApiInternalServerErrorResponse
} from '@nestjs/swagger'
import { GeneralResponseDto } from '../interfaces/general-response.interface'

export const ApiGlobalResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiExtraModels(GeneralResponseDto, model),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(GeneralResponseDto) },
					{
						properties: {
							payload: {
								$ref: getSchemaPath(model)
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

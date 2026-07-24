import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from '../logger/logger.service'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private env: string
	constructor(
		private readonly loggerService: LoggerService,
		private readonly configService: ConfigService
	) {
		this.env = this.configService.get<string>('app.env')
	}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const request = ctx.getRequest<Request>()
		const response = ctx.getResponse<Response>()

		const status = exception.getStatus()
		let message: string
		if (status === 500) {
			message = 'Internal server error'
		} else {
			message = exception.message || 'An error occurred'
		}
		this.loggerService.logRequestError(exception, request.body)

		response.status(status).json({
			statusCode: status,
			message,
			timestamp: new Date().toISOString(),
			path: request.url,
			...(this.env === 'development' && { type: exception.name })
		})
	}
}

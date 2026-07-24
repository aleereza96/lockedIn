import { Injectable } from '@nestjs/common'
import { createLogger, format, Logger, transports } from 'winston'

@Injectable()
export class LoggerService {
	private logger: Logger

	constructor() {
		const logFormat = format.printf(({ timestamp, level, stack, message }) => {
			return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${
				stack || message
			}`
		})

		this.logger = createLogger({
			format: format.combine(format.timestamp(), logFormat),
			transports: [
				new transports.Console(),
				new transports.File({
					filename: 'logs/error.log',
					level: 'error'
				}),
				new transports.File({
					filename: 'logs/combined.log'
				})
			]
		})
	}

	logError(message: string): void {
		this.logger.error(message)
	}

	logInfo(message: string): void {
		this.logger.info(message)
	}

	logWarn(message: string): void {
		this.logger.warn(message)
	}

	logDebug(message: string): void {
		this.logger.debug(message)
	}

	logInfoWithMetadata(message: string, metadata: any): void {
		this.logger.info(`${message} | Metadata: ${JSON.stringify(metadata)}`)
	}

	logRequestError(error: Error, requestBody: any): void {
		this.logger.error(
			`Error: ${error.message}, Request Body: ${JSON.stringify(requestBody)}`
		)
	}
}

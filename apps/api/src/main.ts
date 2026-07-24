import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)

	const globalPrefix = configService.get('app.apiPrefix') as string

	app.setGlobalPrefix(globalPrefix)

	const allowedOrigins =
		(configService.get('app.allowedOrigins') as string).split(',') || []
	app.enableCors({ origin: allowedOrigins })

	const options = new DocumentBuilder()
		.setTitle('CinemaZone Backend API')
		.setVersion(configService.get('app.version') as string)
		.build()
	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup('docs', app, document)

	const port = configService.get('app.port') as string
	await app.listen(port)
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
	)
}

bootstrap().catch((err: string) => {
	throw new Error(err)
})

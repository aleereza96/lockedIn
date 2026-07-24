import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
	port: Number(process.env.PORT),
	apiPrefix: process.env.CZ_BE_API_PREFIX,
	allowedOrigins: process.env.CZ_BE_ALLOWED_ORIGINS,
	version: process.env.CZ_BE_VERSION
}))

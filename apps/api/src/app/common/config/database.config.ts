import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
	type: process.env.CZ_DB_TYPE,
	host: process.env.CZ_DB_HOST,
	port: Number(process.env.CZ_DB_PORT),
	username: `${process.env.CZ_DB_USER}`,
	password: `${process.env.CZ_DB_PASSWORD}`,
	name: `${process.env.CZ_DB}`,
	autoLoadEntities: false,
	synchronize: false
}))

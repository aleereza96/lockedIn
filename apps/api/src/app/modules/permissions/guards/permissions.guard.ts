import { Reflector } from '@nestjs/core'
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { User } from '../../users/entities/user.entity'

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const permissions = this.reflector.get<string[]>(
			'permissions',
			context.getHandler()
		)
		if (!permissions?.length) {
			return true
		}

		const { user } = context.switchToHttp().getRequest()
		const hasAccess = this.matchPermissions(permissions, user)
		if (!hasAccess) {
			throw new ForbiddenException('Access Denied')
		}
		return hasAccess
	}

	matchPermissions(permissionSlugs: string[], user: User): boolean {
		const { roles } = user

		const isSuperUser = roles.some(({ id }) => id === -1)
		if (isSuperUser) {
			return true
		}

		const userPermissionSlugs = roles.flatMap((role) =>
			role.permissions.map((permission) => permission.slug)
		)

		return permissionSlugs.some((permissionSlug) =>
			userPermissionSlugs?.includes(permissionSlug)
		)
	}
}

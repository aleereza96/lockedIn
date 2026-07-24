import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { GeneralResponseDto } from '../interfaces/general-response.interface'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<GeneralResponseDto<T>> {
		const timestamp = new Date().getTime()
		return next.handle().pipe(
			map((payload) => {
				return { payload, timestamp }
			})
		)
	}
}

import { PaginationRequest } from '../../common/interfaces/pagination.interface'

export enum DumpType {
	TRASH = 'trash',
	SAVE = 'save'
}
export interface DumpsPaginationRequest extends PaginationRequest {
	type?: DumpType
}

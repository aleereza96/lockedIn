export interface PaginationRequest {
	page: number
	limit: number
	sortBy?: string
	sortOrder?: 'ASC' | 'DESC'
	params?: Record<string, any> & { keyword: string }
	joins?: string
}

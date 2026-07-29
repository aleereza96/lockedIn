export enum SessionStatus {
	ACTIVE = 'active',
	COMPLETED = 'completed',
	SAVED = 'saved' // auto-closed after inactivity — never shown as "abandoned"
}

export enum FocusRating {
	STRUGGLED = 0,
	OKAY = 1,
	DEEP_FOCUS = 2
}

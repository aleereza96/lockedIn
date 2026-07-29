import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { UpdateSessionDto } from './dto/update-session.dto'

@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}
}

// start session
// pause session by session id
// stop session by session id (auto or manual)
// get active session (if has returns session otherwise returns null)
// resume session (returns the active session)

// -------------
// admin side:
// getAll sessions
// getSessionById
// stop Session
// delete session

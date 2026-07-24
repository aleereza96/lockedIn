import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionPauseDto } from './create-session-pause.dto';

export class UpdateSessionPauseDto extends PartialType(CreateSessionPauseDto) {}

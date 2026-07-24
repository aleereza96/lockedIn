import { Injectable } from '@nestjs/common';
import { CreateSessionPauseDto } from './dto/create-session-pause.dto';
import { UpdateSessionPauseDto } from './dto/update-session-pause.dto';

@Injectable()
export class SessionPausesService {
  create(createSessionPauseDto: CreateSessionPauseDto) {
    return 'This action adds a new sessionPause';
  }

  findAll() {
    return `This action returns all sessionPauses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sessionPause`;
  }

  update(id: number, updateSessionPauseDto: UpdateSessionPauseDto) {
    return `This action updates a #${id} sessionPause`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessionPause`;
  }
}

import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { DumpsService } from './dumps.service'
import { CreateDumpItemDto } from './dto/create-dump.dto'
import { DumpItemResponseDto } from './dto/dump-response.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Dumps')
@Controller('dumps')
export class DumpsController {
  constructor(private readonly dumpsService: DumpsService) { }
  
}

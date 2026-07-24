import { PartialType } from '@nestjs/mapped-types';
import { CreateDumpDto } from './create-dump.dto';

export class UpdateDumpDto extends PartialType(CreateDumpDto) {}

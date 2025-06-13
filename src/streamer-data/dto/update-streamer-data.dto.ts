// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatestreamerDataDto } from './create-streamer-data.dto';

export class UpdatestreamerDataDto extends PartialType(CreatestreamerDataDto) {}

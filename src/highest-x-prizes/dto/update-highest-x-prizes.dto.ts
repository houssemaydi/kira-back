// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatehighestXPrizesDto } from './create-highest-x-prizes.dto';

export class UpdatehighestXPrizesDto extends PartialType(
  CreatehighestXPrizesDto,
) {}

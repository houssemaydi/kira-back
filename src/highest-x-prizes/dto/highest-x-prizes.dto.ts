import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class highestXPrizesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

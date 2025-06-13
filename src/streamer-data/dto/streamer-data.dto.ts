import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class streamerDataDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

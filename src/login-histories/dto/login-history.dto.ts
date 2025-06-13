import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginHistoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class leaderboardPrizesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

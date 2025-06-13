import { ApiProperty } from '@nestjs/swagger';

export class leaderboardPrizes {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  leaderboardPrizes?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

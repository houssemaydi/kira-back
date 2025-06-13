import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class highestXPrizes {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  @Column({ type: 'real', nullable: true })
  minBet?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  prize?: number | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

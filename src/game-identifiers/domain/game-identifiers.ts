import { ApiProperty } from '@nestjs/swagger';

export class GameIdentifiers {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  endDate?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  startDate?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  gameIdentifiers?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

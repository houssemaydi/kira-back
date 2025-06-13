import { ApiProperty } from '@nestjs/swagger';

export class streamerData {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  discord?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  tiktok?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  twitter?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  instagram?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  streamerlogo?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  roobetCode?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  streamerName?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

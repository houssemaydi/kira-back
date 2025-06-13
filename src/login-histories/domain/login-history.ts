import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class LoginHistory {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  ip: string;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

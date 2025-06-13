import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PlayerVerificationDto {
  @ApiProperty()
  @IsNotEmpty()
  playerUserName: string;
}
export class PlayerVerificationResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  playerUserName: string;
  @ApiProperty()
  @IsNotEmpty()
  isAffiliate: boolean;
}
export class PlayerStatsDto {
  @ApiProperty()
  @IsNotEmpty()
  playerUserName: string;
  @ApiProperty()
  @IsNotEmpty()
  startDate: string;
  @ApiProperty()
  @IsOptional()
  endDate: string;
}
export class PlayerStatsResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  playerUserName: string;
  @ApiProperty()
  totalWageredAmount: number;
  @ApiProperty()
  totalWeightedAmount: number;
  @ApiProperty()
  favoriteGame: string;
  @ApiProperty()
  rankLevel: number;
  @ApiProperty()
  rankLevelImage: string;
}
export class LeaderboardDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  startDate: string | null;
  @ApiProperty()
  @IsOptional()
  endDate: string | null;
  @ApiProperty()
  @IsOptional()
  wagerAmount: number;
  @ApiProperty()
  @IsOptional()
  isCurrentMonth: boolean;
}
export class LeaderboardDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  weightedWagered: number;
  @ApiProperty()
  @IsNotEmpty()
  rankLevelImage: string;
}
export class LeaderboardDataResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  startDate: string;
  @ApiProperty()
  @IsOptional()
  endDate: string;
  @ApiProperty()
  @IsNotEmpty()
  leaderboard: LeaderboardDto;
}

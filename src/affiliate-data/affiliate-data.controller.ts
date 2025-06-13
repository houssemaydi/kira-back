import {
  Controller,
  Post,
  Body,
  UseGuards,
  SerializeOptions,
  HttpCode,
  HttpStatus,
  Req,
  Request,
  Inject,
  Logger,
} from '@nestjs/common';
import { AffiliateDataService } from './affiliate-data.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  LeaderboardDataDto,
  LeaderboardDataResponseDto,
  PlayerStatsDto,
  PlayerStatsResponseDto,
  PlayerVerificationDto,
  PlayerVerificationResponseDto,
} from './dto/player';

@ApiTags('Affiliatedata')
@ApiBearerAuth()
@Controller({
  path: 'affiliate-data',
  version: '1',
})
export class AffiliateDataController {
  private readonly logger = new Logger(AffiliateDataController.name);
  private cacheTimestamps: Map<string, number> = new Map();
  private readonly DEFAULT_CACHE_TTL = 30000; // 30 seconds

  constructor(
    private readonly affiliateDataService: AffiliateDataService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Generate a cache key based on start and end dates for leaderboard
   * @param dto LeaderboardDataDto
   * @returns string
   */
  private generateLeaderboardCacheKey(dto: LeaderboardDataDto): string {
    return `leaderboard:${dto.startDate || 'null'}-${dto.endDate || 'null'}`;
  }

  /**
   * Generate a cache key for public leaderboard
   * @param dto LeaderboardDataDto
   * @returns string
   */
  private generatePublicLeaderboardCacheKey(dto: LeaderboardDataDto): string {
    return `public-leaderboard:${dto.isCurrentMonth}`;
  }

  /**
   * Generate a cache key for highest multipliers
   * @param dto LeaderboardDataDto
   * @returns string
   */
  private generateHighestXCacheKey(dto: LeaderboardDataDto): string {
    return `public-highestx:${dto.startDate || 'null'}-${dto.endDate || 'null'}`;
  }

  /**
   * Calculate remaining cache time
   * @param cacheKey The cache key to check
   * @param ttl Time to live in milliseconds
   * @returns number Remaining time in milliseconds
   */
  private calculateRemainingTime(cacheKey: string, ttl: number): number {
    const setTimestamp = this.cacheTimestamps.get(cacheKey);
    if (!setTimestamp) return 0;

    const elapsedTime = Date.now() - setTimestamp;
    const remainingTime = ttl - elapsedTime;
    return Math.max(0, remainingTime);
  }

  /**
   * Log cache operation details with remaining time
   * @param operation Cache operation type
   * @param cacheKey Generated cache key
   * @param data Data involved in the operation
   * @param ttl Time to live in milliseconds
   */
  private async logCacheOperation(
    operation: 'HIT' | 'MISS' | 'SET',
    cacheKey: string,
    data?: any,
    ttl: number = this.DEFAULT_CACHE_TTL,
  ): Promise<void> {
    const remainingTime = await this.calculateRemainingTime(cacheKey, ttl);

    this.logger.log(`Cache ${operation}: Key = ${cacheKey}`, {
      operation,
      cacheKey,
      dataType: data ? typeof data : 'N/A',
      dataLength: data ? JSON.stringify(data).length : 0,
      remainingTimeMs: remainingTime,
      remainingTimeSec: Math.round(remainingTime / 1000),
      totalTtlMs: ttl,
    });
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('player/verification')
  @ApiOkResponse({
    type: PlayerVerificationResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public validatePlayerRb(
    @Req() request: Request,
    @Body() playerVerificationDto: PlayerVerificationDto,
  ): Promise<PlayerVerificationResponseDto> {
    return this.affiliateDataService.validatePlayer(playerVerificationDto);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('player/stats')
  @ApiOkResponse({
    type: PlayerStatsResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public fetchPlayerStats(
    @Req() request: Request,
    @Body() playerStatsDto: PlayerStatsDto,
  ): Promise<PlayerStatsResponseDto> {
    return this.affiliateDataService.playerStats(playerStatsDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('leaderboard/data')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: LeaderboardDataResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async fetchLeaderboardData(
    @Req() request: Request,
    @Body() leaderboardDataDto: LeaderboardDataDto,
  ): Promise<LeaderboardDataResponseDto> {
    // Generate cache key
    const cacheKey = this.generateLeaderboardCacheKey(leaderboardDataDto);
    const ttl = this.DEFAULT_CACHE_TTL;

    // Try to get cached data
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      await this.logCacheOperation('HIT', cacheKey, cachedData, ttl);
      return cachedData as LeaderboardDataResponseDto;
    }

    // Log cache miss
    await this.logCacheOperation('MISS', cacheKey, null, ttl);

    // Fetch data if not in cache
    const leaderboardData = await this.affiliateDataService.leaderboardData(
      leaderboardDataDto,
      false,
    );

    // Cache the data
    await this.cacheManager.set(cacheKey, leaderboardData, ttl);

    // Store the timestamp when the cache was set
    this.cacheTimestamps.set(cacheKey, Date.now());

    // Log cache set
    await this.logCacheOperation('SET', cacheKey, leaderboardData, ttl);

    return leaderboardData;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('statsbywager')
  @ApiOkResponse({
    type: LeaderboardDataResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public fetchStatsByWager(
    @Req() request: Request,
    @Body() leaderboardDataDto: LeaderboardDataDto,
  ): Promise<LeaderboardDataResponseDto> {
    return this.affiliateDataService.fetchStatsByWager(leaderboardDataDto);
  }

  @Post('public/leaderboard/data')
  @ApiOkResponse({
    type: LeaderboardDataResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async fetchPublicLeaderboardData(
    @Req() request: Request,
    @Body() leaderboardDataDto: LeaderboardDataDto,
  ): Promise<LeaderboardDataResponseDto> {
    // Generate cache key
    const cacheKey = this.generatePublicLeaderboardCacheKey(leaderboardDataDto);
    const ttl = this.DEFAULT_CACHE_TTL;

    // Try to get cached data
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      await this.logCacheOperation('HIT', cacheKey, cachedData, ttl);
      return cachedData as LeaderboardDataResponseDto;
    }

    // Log cache miss
    await this.logCacheOperation('MISS', cacheKey, null, ttl);

    // Fetch data if not in cache
    const leaderboardData = await this.affiliateDataService.leaderboardData(
      leaderboardDataDto,
      true,
    );

    // Cache the data
    await this.cacheManager.set(cacheKey, leaderboardData, ttl);

    // Store the timestamp when the cache was set
    this.cacheTimestamps.set(cacheKey, Date.now());

    // Log cache set
    await this.logCacheOperation('SET', cacheKey, leaderboardData, ttl);

    return leaderboardData;
  }

  @Post('public/highestx/data')
  @ApiOkResponse({
    type: LeaderboardDataResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async fetchPublicHighestMultipliers(
    @Req() request: Request,
    @Body() leaderboardDataDto: LeaderboardDataDto,
  ): Promise<LeaderboardDataResponseDto> {
    // Generate cache key
    const cacheKey = this.generateHighestXCacheKey(leaderboardDataDto);
    const ttl = this.DEFAULT_CACHE_TTL;

    // Try to get cached data
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      await this.logCacheOperation('HIT', cacheKey, cachedData, ttl);
      return cachedData as LeaderboardDataResponseDto;
    }

    // Log cache miss
    await this.logCacheOperation('MISS', cacheKey, null, ttl);

    // Fetch data if not in cache
    const multiplierData =
      await this.affiliateDataService.fetchMultipleProviders(
        leaderboardDataDto,
        true,
      );

    // Cache the data
    await this.cacheManager.set(cacheKey, multiplierData, ttl);

    // Store the timestamp when the cache was set
    this.cacheTimestamps.set(cacheKey, Date.now());

    // Log cache set
    await this.logCacheOperation('SET', cacheKey, multiplierData, ttl);

    return multiplierData;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('highestx/data')
  @ApiOkResponse({
    type: LeaderboardDataResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public fetchAdminHighestMultipliers(
    @Req() request: Request,
    @Body() leaderboardDataDto: LeaderboardDataDto,
  ): Promise<LeaderboardDataResponseDto> {
    return this.affiliateDataService.fetchMultipleProviders(
      leaderboardDataDto,
      false,
    );
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Inject,
  Logger,
} from '@nestjs/common';
import { streamerDataService } from './streamer-data.service';
import { CreatestreamerDataDto } from './dto/create-streamer-data.dto';
import { UpdatestreamerDataDto } from './dto/update-streamer-data.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { streamerData } from './domain/streamer-data';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllstreamerDataDto } from './dto/find-all-streamer-data.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('Streamerdata')
@ApiBearerAuth()
@Controller({
  path: 'streamer-data',
  version: '1',
})
export class streamerDataController {
  private readonly logger = new Logger(streamerDataController.name);
  private cacheTimestamps: Map<string, number> = new Map();
  private readonly DEFAULT_CACHE_TTL = 18000000; // 5 hours

  constructor(
    private readonly streamerDataService: streamerDataService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Generate a cache key for streamer data by ID
   * @param id Streamer data ID
   * @returns string
   */
  private generateStreamerDataCacheKey(id: string): string {
    return `streamer:${id}`;
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
    const remainingTime = this.calculateRemainingTime(cacheKey, ttl);

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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    type: streamerData,
  })
  create(@Body() createstreamerDataDto: CreatestreamerDataDto) {
    return this.streamerDataService.create(createstreamerDataDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(streamerData),
  })
  async findAll(
    @Query() query: FindAllstreamerDataDto,
  ): Promise<InfinityPaginationResponseDto<streamerData>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.streamerDataService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: streamerData,
  })
  async findById(@Param('id') id: string): Promise<streamerData> {
    // Generate cache key
    const cacheKey = this.generateStreamerDataCacheKey(id);
    const ttl = this.DEFAULT_CACHE_TTL;

    // Try to get cached data
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      await this.logCacheOperation('HIT', cacheKey, cachedData, ttl);
      return cachedData as streamerData;
    }

    // Log cache miss
    await this.logCacheOperation('MISS', cacheKey, null, ttl);

    // Fetch data if not in cache
    const streamerData = await this.streamerDataService.findById(id);

    // Cache the data for 15 minutes
    await this.cacheManager.set(cacheKey, streamerData, ttl);

    // Store the timestamp when the cache was set
    this.cacheTimestamps.set(cacheKey, Date.now());

    // Log cache set
    await this.logCacheOperation('SET', cacheKey, streamerData, ttl);

    return streamerData;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: streamerData,
  })
  async update(
    @Param('id') id: string,
    @Body() updatestreamerDataDto: UpdatestreamerDataDto,
  ): Promise<streamerData> {
    // Remove the cached item when updating
    const cacheKey = this.generateStreamerDataCacheKey(id);
    await this.cacheManager.del(cacheKey);
    this.cacheTimestamps.delete(cacheKey);

    return this.streamerDataService.update(id, updatestreamerDataDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async remove(@Param('id') id: string): Promise<void> {
    // Remove the cached item when deleting
    const cacheKey = this.generateStreamerDataCacheKey(id);
    await this.cacheManager.del(cacheKey);
    this.cacheTimestamps.delete(cacheKey);

    return this.streamerDataService.remove(id);
  }
}

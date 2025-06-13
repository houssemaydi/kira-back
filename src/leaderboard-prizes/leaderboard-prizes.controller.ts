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
  Put,
} from '@nestjs/common';
import { leaderboardPrizesService } from './leaderboard-prizes.service';
import { CreateleaderboardPrizesDto } from './dto/create-leaderboard-prizes.dto';
import { UpdateleaderboardPrizesDto } from './dto/update-leaderboard-prizes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { leaderboardPrizes } from './domain/leaderboard-prizes';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllleaderboardPrizesDto } from './dto/find-all-leaderboard-prizes.dto';

@ApiTags('Leaderboardprizes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'leaderboard-prizes',
  version: '1',
})
export class leaderboardPrizesController {
  constructor(
    private readonly leaderboardPrizesService: leaderboardPrizesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: leaderboardPrizes,
  })
  create(@Body() createleaderboardPrizesDto: CreateleaderboardPrizesDto) {
    return this.leaderboardPrizesService.create(createleaderboardPrizesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(leaderboardPrizes),
  })
  async findAll(
    @Query() query: FindAllleaderboardPrizesDto,
  ): Promise<InfinityPaginationResponseDto<leaderboardPrizes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.leaderboardPrizesService.findAllWithPagination({
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
    type: leaderboardPrizes,
  })
  findById(@Param('id') id: string) {
    return this.leaderboardPrizesService.findById(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: leaderboardPrizes,
  })
  update(
    @Param('id') id: string,
    @Body() updateleaderboardPrizesDto: UpdateleaderboardPrizesDto,
  ) {
    return this.leaderboardPrizesService.update(id, updateleaderboardPrizesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.leaderboardPrizesService.remove(id);
  }
}

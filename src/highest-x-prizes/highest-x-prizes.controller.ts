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
} from '@nestjs/common';
import { highestXPrizesService } from './highest-x-prizes.service';
import { CreatehighestXPrizesDto } from './dto/create-highest-x-prizes.dto';
import { UpdatehighestXPrizesDto } from './dto/update-highest-x-prizes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { highestXPrizes } from './domain/highest-x-prizes';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllhighestXPrizesDto } from './dto/find-all-highest-x-prizes.dto';

@ApiTags('Highestxprizes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'highest-x-prizes',
  version: '1',
})
export class highestXPrizesController {
  constructor(private readonly highestXPrizesService: highestXPrizesService) {}

  @Post()
  @ApiCreatedResponse({
    type: highestXPrizes,
  })
  create(@Body() createhighestXPrizesDto: CreatehighestXPrizesDto) {
    return this.highestXPrizesService.create(createhighestXPrizesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(highestXPrizes),
  })
  async findAll(
    @Query() query: FindAllhighestXPrizesDto,
  ): Promise<InfinityPaginationResponseDto<highestXPrizes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.highestXPrizesService.findAllWithPagination({
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
    type: highestXPrizes,
  })
  findById(@Param('id') id: string) {
    return this.highestXPrizesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: highestXPrizes,
  })
  update(
    @Param('id') id: string,
    @Body() updatehighestXPrizesDto: UpdatehighestXPrizesDto,
  ) {
    return this.highestXPrizesService.update(id, updatehighestXPrizesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.highestXPrizesService.remove(id);
  }
}

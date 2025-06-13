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
import { GameIdentifiersService } from './game-identifiers.service';
import { CreateGameIdentifiersDto } from './dto/create-game-identifiers.dto';
import { UpdateGameIdentifiersDto } from './dto/update-game-identifiers.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GameIdentifiers } from './domain/game-identifiers';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllGameIdentifiersDto } from './dto/find-all-game-identifiers.dto';

@ApiTags('Gameidentifiers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'game-identifiers',
  version: '1',
})
export class GameIdentifiersController {
  constructor(
    private readonly gameIdentifiersService: GameIdentifiersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: GameIdentifiers,
  })
  create(@Body() createGameIdentifiersDto: CreateGameIdentifiersDto) {
    return this.gameIdentifiersService.create(createGameIdentifiersDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(GameIdentifiers),
  })
  async findAll(
    @Query() query: FindAllGameIdentifiersDto,
  ): Promise<InfinityPaginationResponseDto<GameIdentifiers>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.gameIdentifiersService.findAllWithPagination({
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
    type: GameIdentifiers,
  })
  findById(@Param('id') id: string) {
    return this.gameIdentifiersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: GameIdentifiers,
  })
  update(
    @Param('id') id: string,
    @Body() updateGameIdentifiersDto: UpdateGameIdentifiersDto,
  ) {
    return this.gameIdentifiersService.update(id, updateGameIdentifiersDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.gameIdentifiersService.remove(id);
  }
}

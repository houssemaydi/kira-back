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
import { LoginHistoriesService } from './login-histories.service';
import { CreateLoginHistoryDto } from './dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from './dto/update-login-history.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LoginHistory } from './domain/login-history';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLoginHistoriesDto } from './dto/find-all-login-histories.dto';

@ApiTags('Loginhistories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'login-histories',
  version: '1',
})
export class LoginHistoriesController {
  constructor(private readonly loginHistoriesService: LoginHistoriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: LoginHistory,
  })
  create(@Body() createLoginHistoryDto: CreateLoginHistoryDto) {
    return this.loginHistoriesService.create(createLoginHistoryDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(LoginHistory),
  })
  async findAll(
    @Query() query: FindAllLoginHistoriesDto,
  ): Promise<InfinityPaginationResponseDto<LoginHistory>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.loginHistoriesService.findAllWithPagination({
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
    type: LoginHistory,
  })
  findById(@Param('id') id: string) {
    return this.loginHistoriesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: LoginHistory,
  })
  update(
    @Param('id') id: string,
    @Body() updateLoginHistoryDto: UpdateLoginHistoryDto,
  ) {
    return this.loginHistoriesService.update(id, updateLoginHistoryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.loginHistoriesService.remove(id);
  }
}

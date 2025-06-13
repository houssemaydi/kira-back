import { Injectable } from '@nestjs/common';
import { CreateleaderboardPrizesDto } from './dto/create-leaderboard-prizes.dto';
import { UpdateleaderboardPrizesDto } from './dto/update-leaderboard-prizes.dto';
import { leaderboardPrizesRepository } from './infrastructure/persistence/leaderboard-prizes.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { leaderboardPrizes } from './domain/leaderboard-prizes';

@Injectable()
export class leaderboardPrizesService {
  constructor(
    // Dependencies here
    private readonly leaderboardPrizesRepository: leaderboardPrizesRepository,
  ) {}

  async create(createleaderboardPrizesDto: CreateleaderboardPrizesDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.leaderboardPrizesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      leaderboardPrizes: createleaderboardPrizesDto.leaderboardPrizes,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.leaderboardPrizesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: leaderboardPrizes['id']) {
    return this.leaderboardPrizesRepository.findById(id);
  }

  findByIds(ids: leaderboardPrizes['id'][]) {
    return this.leaderboardPrizesRepository.findByIds(ids);
  }

  async update(
    id: leaderboardPrizes['id'],

    updateleaderboardPrizesDto: UpdateleaderboardPrizesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.leaderboardPrizesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      leaderboardPrizes: updateleaderboardPrizesDto.leaderboardPrizes,
    });
  }

  remove(id: leaderboardPrizes['id']) {
    return this.leaderboardPrizesRepository.remove(id);
  }
}

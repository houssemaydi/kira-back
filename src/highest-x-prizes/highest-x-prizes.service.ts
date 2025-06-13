import { Injectable } from '@nestjs/common';
import { CreatehighestXPrizesDto } from './dto/create-highest-x-prizes.dto';
import { UpdatehighestXPrizesDto } from './dto/update-highest-x-prizes.dto';
import { highestXPrizesRepository } from './infrastructure/persistence/highest-x-prizes.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { highestXPrizes } from './domain/highest-x-prizes';

@Injectable()
export class highestXPrizesService {
  constructor(
    // Dependencies here
    private readonly highestXPrizesRepository: highestXPrizesRepository,
  ) {}

  async create(createhighestXPrizesDto: CreatehighestXPrizesDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.highestXPrizesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      minBet: createhighestXPrizesDto.minBet,

      prize: createhighestXPrizesDto.prize,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.highestXPrizesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: highestXPrizes['id']) {
    return this.highestXPrizesRepository.findById(id);
  }

  findByIds(ids: highestXPrizes['id'][]) {
    return this.highestXPrizesRepository.findByIds(ids);
  }

  async update(
    id: highestXPrizes['id'],

    updatehighestXPrizesDto: UpdatehighestXPrizesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.highestXPrizesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      minBet: updatehighestXPrizesDto.minBet,

      prize: updatehighestXPrizesDto.prize,
    });
  }

  remove(id: highestXPrizes['id']) {
    return this.highestXPrizesRepository.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateGameIdentifiersDto } from './dto/create-game-identifiers.dto';
import { UpdateGameIdentifiersDto } from './dto/update-game-identifiers.dto';
import { GameIdentifiersRepository } from './infrastructure/persistence/game-identifiers.repository';
import { GameIdentifiers } from './domain/game-identifiers';

@Injectable()
export class GameIdentifiersService {
  constructor(
    // Dependencies here
    private readonly gameIdentifiersRepository: GameIdentifiersRepository,
  ) {}

  async create(createGameIdentifiersDto: CreateGameIdentifiersDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.gameIdentifiersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      endDate: createGameIdentifiersDto.endDate,

      startDate: createGameIdentifiersDto.startDate,

      gameIdentifiers: createGameIdentifiersDto.gameIdentifiers,
    });
  }

  findAll() {
    return this.gameIdentifiersRepository.findAll();
  }

  findById(id: GameIdentifiers['id']) {
    return this.gameIdentifiersRepository.findById(id);
  }

  findByIds(ids: GameIdentifiers['id'][]) {
    return this.gameIdentifiersRepository.findByIds(ids);
  }

  async update(
    id: GameIdentifiers['id'],

    updateGameIdentifiersDto: UpdateGameIdentifiersDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.gameIdentifiersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      endDate: updateGameIdentifiersDto.endDate,

      startDate: updateGameIdentifiersDto.startDate,

      gameIdentifiers: updateGameIdentifiersDto.gameIdentifiers,
    });
  }

  remove(id: GameIdentifiers['id']) {
    return this.gameIdentifiersRepository.remove(id);
  }
}

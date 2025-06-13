import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { leaderboardPrizesEntity } from '../entities/leaderboard-prizes.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { leaderboardPrizes } from '../../../../domain/leaderboard-prizes';
import { leaderboardPrizesRepository } from '../../leaderboard-prizes.repository';
import { leaderboardPrizesMapper } from '../mappers/leaderboard-prizes.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class leaderboardPrizesRelationalRepository
  implements leaderboardPrizesRepository
{
  constructor(
    @InjectRepository(leaderboardPrizesEntity)
    private readonly leaderboardPrizesRepository: Repository<leaderboardPrizesEntity>,
  ) {}

  async create(data: leaderboardPrizes): Promise<leaderboardPrizes> {
    const persistenceModel = leaderboardPrizesMapper.toPersistence(data);
    const newEntity = await this.leaderboardPrizesRepository.save(
      this.leaderboardPrizesRepository.create(persistenceModel),
    );
    return leaderboardPrizesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<leaderboardPrizes[]> {
    const entities = await this.leaderboardPrizesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => leaderboardPrizesMapper.toDomain(entity));
  }

  async findById(
    id: leaderboardPrizes['id'],
  ): Promise<NullableType<leaderboardPrizes>> {
    const entity = await this.leaderboardPrizesRepository.findOne({
      where: { id },
    });

    return entity ? leaderboardPrizesMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: leaderboardPrizes['id'][],
  ): Promise<leaderboardPrizes[]> {
    const entities = await this.leaderboardPrizesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => leaderboardPrizesMapper.toDomain(entity));
  }

  async update(
    id: leaderboardPrizes['id'],
    payload: Partial<leaderboardPrizes>,
  ): Promise<leaderboardPrizes> {
    const entity = await this.leaderboardPrizesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.leaderboardPrizesRepository.save(
      this.leaderboardPrizesRepository.create(
        leaderboardPrizesMapper.toPersistence({
          ...leaderboardPrizesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return leaderboardPrizesMapper.toDomain(updatedEntity);
  }

  async remove(id: leaderboardPrizes['id']): Promise<void> {
    await this.leaderboardPrizesRepository.delete(id);
  }
}

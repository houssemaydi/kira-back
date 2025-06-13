import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { highestXPrizesEntity } from '../entities/highest-x-prizes.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { highestXPrizes } from '../../../../domain/highest-x-prizes';
import { highestXPrizesRepository } from '../../highest-x-prizes.repository';
import { highestXPrizesMapper } from '../mappers/highest-x-prizes.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class highestXPrizesRelationalRepository
  implements highestXPrizesRepository
{
  constructor(
    @InjectRepository(highestXPrizesEntity)
    private readonly highestXPrizesRepository: Repository<highestXPrizesEntity>,
  ) {}

  async create(data: highestXPrizes): Promise<highestXPrizes> {
    const persistenceModel = highestXPrizesMapper.toPersistence(data);
    const newEntity = await this.highestXPrizesRepository.save(
      this.highestXPrizesRepository.create(persistenceModel),
    );
    return highestXPrizesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<highestXPrizes[]> {
    const entities = await this.highestXPrizesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => highestXPrizesMapper.toDomain(entity));
  }

  async findById(
    id: highestXPrizes['id'],
  ): Promise<NullableType<highestXPrizes>> {
    const entity = await this.highestXPrizesRepository.findOne({
      where: { id },
    });

    return entity ? highestXPrizesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: highestXPrizes['id'][]): Promise<highestXPrizes[]> {
    const entities = await this.highestXPrizesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => highestXPrizesMapper.toDomain(entity));
  }

  async update(
    id: highestXPrizes['id'],
    payload: Partial<highestXPrizes>,
  ): Promise<highestXPrizes> {
    const entity = await this.highestXPrizesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.highestXPrizesRepository.save(
      this.highestXPrizesRepository.create(
        highestXPrizesMapper.toPersistence({
          ...highestXPrizesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return highestXPrizesMapper.toDomain(updatedEntity);
  }

  async remove(id: highestXPrizes['id']): Promise<void> {
    await this.highestXPrizesRepository.delete(id);
  }
}

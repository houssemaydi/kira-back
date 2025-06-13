import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { streamerDataEntity } from '../entities/streamer-data.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { streamerData } from '../../../../domain/streamer-data';
import { streamerDataRepository } from '../../streamer-data.repository';
import { streamerDataMapper } from '../mappers/streamer-data.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class streamerDataRelationalRepository
  implements streamerDataRepository
{
  constructor(
    @InjectRepository(streamerDataEntity)
    private readonly streamerDataRepository: Repository<streamerDataEntity>,
  ) {}

  async create(data: streamerData): Promise<streamerData> {
    const persistenceModel = streamerDataMapper.toPersistence(data);
    const newEntity = await this.streamerDataRepository.save(
      this.streamerDataRepository.create(persistenceModel),
    );
    return streamerDataMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<streamerData[]> {
    const entities = await this.streamerDataRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => streamerDataMapper.toDomain(entity));
  }

  async findById(id: streamerData['id']): Promise<NullableType<streamerData>> {
    const entity = await this.streamerDataRepository.findOne({
      where: { id },
    });

    return entity ? streamerDataMapper.toDomain(entity) : null;
  }

  async findByIds(ids: streamerData['id'][]): Promise<streamerData[]> {
    const entities = await this.streamerDataRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => streamerDataMapper.toDomain(entity));
  }

  async update(
    id: streamerData['id'],
    payload: Partial<streamerData>,
  ): Promise<streamerData> {
    const entity = await this.streamerDataRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.streamerDataRepository.save(
      this.streamerDataRepository.create(
        streamerDataMapper.toPersistence({
          ...streamerDataMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return streamerDataMapper.toDomain(updatedEntity);
  }

  async remove(id: streamerData['id']): Promise<void> {
    await this.streamerDataRepository.delete(id);
  }
}

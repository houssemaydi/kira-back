import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { GameIdentifiersEntity } from '../entities/game-identifiers.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { GameIdentifiers } from '../../../../domain/game-identifiers';
import { GameIdentifiersRepository } from '../../game-identifiers.repository';
import { GameIdentifiersMapper } from '../mappers/game-identifiers.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GameIdentifiersRelationalRepository
  implements GameIdentifiersRepository
{
  constructor(
    @InjectRepository(GameIdentifiersEntity)
    private readonly gameIdentifiersRepository: Repository<GameIdentifiersEntity>,
  ) {}

  async create(data: GameIdentifiers): Promise<GameIdentifiers> {
    const persistenceModel = GameIdentifiersMapper.toPersistence(data);
    const newEntity = await this.gameIdentifiersRepository.save(
      this.gameIdentifiersRepository.create(persistenceModel),
    );
    return GameIdentifiersMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<GameIdentifiers[]> {
    const entities = await this.gameIdentifiersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => GameIdentifiersMapper.toDomain(entity));
  }

  async findById(
    id: GameIdentifiers['id'],
  ): Promise<NullableType<GameIdentifiers>> {
    const entity = await this.gameIdentifiersRepository.findOne({
      where: { id },
    });

    return entity ? GameIdentifiersMapper.toDomain(entity) : null;
  }

  async findByIds(ids: GameIdentifiers['id'][]): Promise<GameIdentifiers[]> {
    const entities = await this.gameIdentifiersRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => GameIdentifiersMapper.toDomain(entity));
  }

  async update(
    id: GameIdentifiers['id'],
    payload: Partial<GameIdentifiers>,
  ): Promise<GameIdentifiers> {
    const entity = await this.gameIdentifiersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.gameIdentifiersRepository.save(
      this.gameIdentifiersRepository.create(
        GameIdentifiersMapper.toPersistence({
          ...GameIdentifiersMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return GameIdentifiersMapper.toDomain(updatedEntity);
  }

  async remove(id: GameIdentifiers['id']): Promise<void> {
    await this.gameIdentifiersRepository.delete(id);
  }
}

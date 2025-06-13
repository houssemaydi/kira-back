import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { LoginHistoryEntity } from '../entities/login-history.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { LoginHistory } from '../../../../domain/login-history';
import { LoginHistoryRepository } from '../../login-history.repository';
import { LoginHistoryMapper } from '../mappers/login-history.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LoginHistoryRelationalRepository
  implements LoginHistoryRepository
{
  constructor(
    @InjectRepository(LoginHistoryEntity)
    private readonly loginHistoryRepository: Repository<LoginHistoryEntity>,
  ) {}

  async create(data: LoginHistory): Promise<LoginHistory> {
    const persistenceModel = LoginHistoryMapper.toPersistence(data);
    const newEntity = await this.loginHistoryRepository.save(
      this.loginHistoryRepository.create(persistenceModel),
    );
    return LoginHistoryMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<LoginHistory[]> {
    const entities = await this.loginHistoryRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => LoginHistoryMapper.toDomain(entity));
  }

  async findById(id: LoginHistory['id']): Promise<NullableType<LoginHistory>> {
    const entity = await this.loginHistoryRepository.findOne({
      where: { id },
    });

    return entity ? LoginHistoryMapper.toDomain(entity) : null;
  }

  async findByIds(ids: LoginHistory['id'][]): Promise<LoginHistory[]> {
    const entities = await this.loginHistoryRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => LoginHistoryMapper.toDomain(entity));
  }

  async findAllByIp(ip: string): Promise<LoginHistory[]> {
    const entities = await this.loginHistoryRepository.find({
      where: { ip: String(ip) },
    });

    return entities.map((entity) => LoginHistoryMapper.toDomain(entity));
  }
  async update(
    id: LoginHistory['id'],
    payload: Partial<LoginHistory>,
  ): Promise<LoginHistory> {
    const entity = await this.loginHistoryRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.loginHistoryRepository.save(
      this.loginHistoryRepository.create(
        LoginHistoryMapper.toPersistence({
          ...LoginHistoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LoginHistoryMapper.toDomain(updatedEntity);
  }

  async remove(id: LoginHistory['id']): Promise<void> {
    await this.loginHistoryRepository.delete(id);
  }
}

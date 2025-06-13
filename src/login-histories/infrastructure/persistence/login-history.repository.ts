import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { LoginHistory } from '../../domain/login-history';

export abstract class LoginHistoryRepository {
  abstract create(
    data: Omit<LoginHistory, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<LoginHistory>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<LoginHistory[]>;

  abstract findById(
    id: LoginHistory['id'],
  ): Promise<NullableType<LoginHistory>>;

  abstract findByIds(ids: LoginHistory['id'][]): Promise<LoginHistory[]>;
  abstract findAllByIp(ip: string): Promise<LoginHistory[]>;

  abstract update(
    id: LoginHistory['id'],
    payload: DeepPartial<LoginHistory>,
  ): Promise<LoginHistory | null>;

  abstract remove(id: LoginHistory['id']): Promise<void>;
}

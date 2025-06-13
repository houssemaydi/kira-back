import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { highestXPrizes } from '../../domain/highest-x-prizes';

export abstract class highestXPrizesRepository {
  abstract create(
    data: Omit<highestXPrizes, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<highestXPrizes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<highestXPrizes[]>;

  abstract findById(
    id: highestXPrizes['id'],
  ): Promise<NullableType<highestXPrizes>>;

  abstract findByIds(ids: highestXPrizes['id'][]): Promise<highestXPrizes[]>;

  abstract update(
    id: highestXPrizes['id'],
    payload: DeepPartial<highestXPrizes>,
  ): Promise<highestXPrizes | null>;

  abstract remove(id: highestXPrizes['id']): Promise<void>;
}

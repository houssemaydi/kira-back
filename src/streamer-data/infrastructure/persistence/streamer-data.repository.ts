import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { streamerData } from '../../domain/streamer-data';

export abstract class streamerDataRepository {
  abstract create(
    data: Omit<streamerData, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<streamerData>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<streamerData[]>;

  abstract findById(
    id: streamerData['id'],
  ): Promise<NullableType<streamerData>>;

  abstract findByIds(ids: streamerData['id'][]): Promise<streamerData[]>;

  abstract update(
    id: streamerData['id'],
    payload: DeepPartial<streamerData>,
  ): Promise<streamerData | null>;

  abstract remove(id: streamerData['id']): Promise<void>;
}

import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { leaderboardPrizes } from '../../domain/leaderboard-prizes';

export abstract class leaderboardPrizesRepository {
  abstract create(
    data: Omit<leaderboardPrizes, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<leaderboardPrizes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<leaderboardPrizes[]>;

  abstract findById(
    id: leaderboardPrizes['id'],
  ): Promise<NullableType<leaderboardPrizes>>;

  abstract findByIds(
    ids: leaderboardPrizes['id'][],
  ): Promise<leaderboardPrizes[]>;

  abstract update(
    id: leaderboardPrizes['id'],
    payload: DeepPartial<leaderboardPrizes>,
  ): Promise<leaderboardPrizes | null>;

  abstract remove(id: leaderboardPrizes['id']): Promise<void>;
}

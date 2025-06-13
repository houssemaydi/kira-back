import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { GameIdentifiers } from '../../domain/game-identifiers';

export abstract class GameIdentifiersRepository {
  abstract create(
    data: Omit<GameIdentifiers, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GameIdentifiers>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<GameIdentifiers[]>;

  abstract findById(
    id: GameIdentifiers['id'],
  ): Promise<NullableType<GameIdentifiers>>;

  abstract findByIds(ids: GameIdentifiers['id'][]): Promise<GameIdentifiers[]>;

  abstract update(
    id: GameIdentifiers['id'],
    payload: DeepPartial<GameIdentifiers>,
  ): Promise<GameIdentifiers | null>;

  abstract remove(id: GameIdentifiers['id']): Promise<void>;
}

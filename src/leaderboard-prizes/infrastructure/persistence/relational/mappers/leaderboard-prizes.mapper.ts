import { leaderboardPrizes } from '../../../../domain/leaderboard-prizes';

import { leaderboardPrizesEntity } from '../entities/leaderboard-prizes.entity';

export class leaderboardPrizesMapper {
  static toDomain(raw: leaderboardPrizesEntity): leaderboardPrizes {
    const domainEntity = new leaderboardPrizes();
    domainEntity.leaderboardPrizes = raw.leaderboardPrizes;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: leaderboardPrizes,
  ): leaderboardPrizesEntity {
    const persistenceEntity = new leaderboardPrizesEntity();
    persistenceEntity.leaderboardPrizes = domainEntity.leaderboardPrizes;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

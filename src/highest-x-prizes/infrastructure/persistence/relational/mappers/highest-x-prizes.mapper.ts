import { highestXPrizes } from '../../../../domain/highest-x-prizes';

import { highestXPrizesEntity } from '../entities/highest-x-prizes.entity';

export class highestXPrizesMapper {
  static toDomain(raw: highestXPrizesEntity): highestXPrizes {
    const domainEntity = new highestXPrizes();
    domainEntity.minBet = raw.minBet;

    domainEntity.prize = raw.prize;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: highestXPrizes): highestXPrizesEntity {
    const persistenceEntity = new highestXPrizesEntity();
    persistenceEntity.minBet = domainEntity.minBet;

    persistenceEntity.prize = domainEntity.prize;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

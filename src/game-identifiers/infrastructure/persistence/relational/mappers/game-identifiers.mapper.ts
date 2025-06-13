import { GameIdentifiers } from '../../../../domain/game-identifiers';

import { GameIdentifiersEntity } from '../entities/game-identifiers.entity';

export class GameIdentifiersMapper {
  static toDomain(raw: GameIdentifiersEntity): GameIdentifiers {
    const domainEntity = new GameIdentifiers();
    domainEntity.endDate = raw.endDate;

    domainEntity.startDate = raw.startDate;

    domainEntity.gameIdentifiers = raw.gameIdentifiers;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: GameIdentifiers): GameIdentifiersEntity {
    const persistenceEntity = new GameIdentifiersEntity();
    persistenceEntity.endDate = domainEntity.endDate;

    persistenceEntity.startDate = domainEntity.startDate;

    persistenceEntity.gameIdentifiers = domainEntity.gameIdentifiers;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

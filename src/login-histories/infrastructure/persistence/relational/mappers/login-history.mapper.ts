import { LoginHistory } from '../../../../domain/login-history';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { LoginHistoryEntity } from '../entities/login-history.entity';

export class LoginHistoryMapper {
  static toDomain(raw: LoginHistoryEntity): LoginHistory {
    const domainEntity = new LoginHistory();
    domainEntity.ip = raw.ip;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    } else if (raw.user === null) {
      domainEntity.user = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: LoginHistory): LoginHistoryEntity {
    const persistenceEntity = new LoginHistoryEntity();
    persistenceEntity.ip = domainEntity.ip;

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    } else if (domainEntity.user === null) {
      persistenceEntity.user = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

import { streamerData } from '../../../../domain/streamer-data';

import { streamerDataEntity } from '../entities/streamer-data.entity';

export class streamerDataMapper {
  static toDomain(raw: streamerDataEntity): streamerData {
    const domainEntity = new streamerData();
    domainEntity.discord = raw.discord;

    domainEntity.tiktok = raw.tiktok;

    domainEntity.twitter = raw.twitter;

    domainEntity.instagram = raw.instagram;

    domainEntity.streamerlogo = raw.streamerlogo;

    domainEntity.roobetCode = raw.roobetCode;

    domainEntity.streamerName = raw.streamerName;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: streamerData): streamerDataEntity {
    const persistenceEntity = new streamerDataEntity();
    persistenceEntity.discord = domainEntity.discord;

    persistenceEntity.tiktok = domainEntity.tiktok;

    persistenceEntity.twitter = domainEntity.twitter;

    persistenceEntity.instagram = domainEntity.instagram;

    persistenceEntity.streamerlogo = domainEntity.streamerlogo;

    persistenceEntity.roobetCode = domainEntity.roobetCode;

    persistenceEntity.streamerName = domainEntity.streamerName;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

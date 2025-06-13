import { Module } from '@nestjs/common';
import { streamerDataRepository } from '../streamer-data.repository';
import { streamerDataRelationalRepository } from './repositories/streamer-data.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { streamerDataEntity } from './entities/streamer-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([streamerDataEntity])],
  providers: [
    {
      provide: streamerDataRepository,
      useClass: streamerDataRelationalRepository,
    },
  ],
  exports: [streamerDataRepository],
})
export class RelationalstreamerDataPersistenceModule {}

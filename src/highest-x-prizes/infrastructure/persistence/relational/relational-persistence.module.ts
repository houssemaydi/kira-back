import { Module } from '@nestjs/common';
import { highestXPrizesRepository } from '../highest-x-prizes.repository';
import { highestXPrizesRelationalRepository } from './repositories/highest-x-prizes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { highestXPrizesEntity } from './entities/highest-x-prizes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([highestXPrizesEntity])],
  providers: [
    {
      provide: highestXPrizesRepository,
      useClass: highestXPrizesRelationalRepository,
    },
  ],
  exports: [highestXPrizesRepository],
})
export class RelationalhighestXPrizesPersistenceModule {}

import { Module } from '@nestjs/common';
import { leaderboardPrizesRepository } from '../leaderboard-prizes.repository';
import { leaderboardPrizesRelationalRepository } from './repositories/leaderboard-prizes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { leaderboardPrizesEntity } from './entities/leaderboard-prizes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([leaderboardPrizesEntity])],
  providers: [
    {
      provide: leaderboardPrizesRepository,
      useClass: leaderboardPrizesRelationalRepository,
    },
  ],
  exports: [leaderboardPrizesRepository],
})
export class RelationalleaderboardPrizesPersistenceModule {}

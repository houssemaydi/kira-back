import { Module } from '@nestjs/common';
import { leaderboardPrizesService } from './leaderboard-prizes.service';
import { leaderboardPrizesController } from './leaderboard-prizes.controller';
import { RelationalleaderboardPrizesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalleaderboardPrizesPersistenceModule,
  ],
  controllers: [leaderboardPrizesController],
  providers: [leaderboardPrizesService],
  exports: [
    leaderboardPrizesService,
    RelationalleaderboardPrizesPersistenceModule,
  ],
})
export class leaderboardPrizesModule {}

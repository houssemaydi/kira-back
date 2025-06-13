import { Module } from '@nestjs/common';
import { AffiliateDataService } from './affiliate-data.service';
import { AffiliateDataController } from './affiliate-data.controller';
import { HttpModule } from '@nestjs/axios';
import { leaderboardPrizesModule } from '../leaderboard-prizes/leaderboard-prizes.module';
import { GameIdentifiersModule } from '../game-identifiers/game-identifiers.module';

@Module({
  imports: [
    // import modules, etc.
    HttpModule,
    leaderboardPrizesModule,
    GameIdentifiersModule,
  ],
  controllers: [AffiliateDataController],
  providers: [AffiliateDataService],
  exports: [AffiliateDataService],
})
export class AffiliateDataModule {}

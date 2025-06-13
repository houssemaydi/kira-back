import { Module } from '@nestjs/common';
import { highestXPrizesService } from './highest-x-prizes.service';
import { highestXPrizesController } from './highest-x-prizes.controller';
import { RelationalhighestXPrizesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalhighestXPrizesPersistenceModule,
  ],
  controllers: [highestXPrizesController],
  providers: [highestXPrizesService],
  exports: [highestXPrizesService, RelationalhighestXPrizesPersistenceModule],
})
export class highestXPrizesModule {}

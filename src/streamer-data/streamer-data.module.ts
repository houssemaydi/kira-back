import { Module } from '@nestjs/common';
import { streamerDataService } from './streamer-data.service';
import { streamerDataController } from './streamer-data.controller';
import { RelationalstreamerDataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalstreamerDataPersistenceModule,
  ],
  controllers: [streamerDataController],
  providers: [streamerDataService],
  exports: [streamerDataService, RelationalstreamerDataPersistenceModule],
})
export class streamerDataModule {}

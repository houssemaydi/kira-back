import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { LoginHistoriesService } from './login-histories.service';
import { LoginHistoriesController } from './login-histories.controller';
import { RelationalLoginHistoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    RelationalLoginHistoryPersistenceModule,
  ],
  controllers: [LoginHistoriesController],
  providers: [LoginHistoriesService],
  exports: [LoginHistoriesService, RelationalLoginHistoryPersistenceModule],
})
export class LoginHistoriesModule {}

import { Module } from '@nestjs/common';
import { LoginHistoryRepository } from '../login-history.repository';
import { LoginHistoryRelationalRepository } from './repositories/login-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHistoryEntity } from './entities/login-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginHistoryEntity])],
  providers: [
    {
      provide: LoginHistoryRepository,
      useClass: LoginHistoryRelationalRepository,
    },
  ],
  exports: [LoginHistoryRepository],
})
export class RelationalLoginHistoryPersistenceModule {}

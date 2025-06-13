import { Module } from '@nestjs/common';
import { GameIdentifiersRepository } from '../game-identifiers.repository';
import { GameIdentifiersRelationalRepository } from './repositories/game-identifiers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameIdentifiersEntity } from './entities/game-identifiers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameIdentifiersEntity])],
  providers: [
    {
      provide: GameIdentifiersRepository,
      useClass: GameIdentifiersRelationalRepository,
    },
  ],
  exports: [GameIdentifiersRepository],
})
export class RelationalGameIdentifiersPersistenceModule {}

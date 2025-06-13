import { Module } from '@nestjs/common';
import { GameIdentifiersService } from './game-identifiers.service';
import { GameIdentifiersController } from './game-identifiers.controller';
import { RelationalGameIdentifiersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalGameIdentifiersPersistenceModule,
  ],
  controllers: [GameIdentifiersController],
  providers: [GameIdentifiersService],
  exports: [GameIdentifiersService, RelationalGameIdentifiersPersistenceModule],
})
export class GameIdentifiersModule {}

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'game_identifiers',
})
export class GameIdentifiersEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  endDate?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  startDate?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  gameIdentifiers?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

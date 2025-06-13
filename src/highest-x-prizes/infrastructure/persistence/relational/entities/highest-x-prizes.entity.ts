import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'highest_x_prizes',
})
export class highestXPrizesEntity extends EntityRelationalHelper {
  @Column({ type: 'real', nullable: true })
  minBet?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  prize?: number | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

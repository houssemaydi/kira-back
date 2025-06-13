import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'streamer_data',
})
export class streamerDataEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  discord?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  tiktok?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  twitter?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  instagram?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  streamerlogo?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  roobetCode?: string | null;
  streamerData;

  @Column({
    nullable: true,
    type: String,
  })
  streamerName?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

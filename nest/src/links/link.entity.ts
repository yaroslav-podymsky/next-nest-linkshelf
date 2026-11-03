import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { LinkStatus } from './link-status';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ default: 'todo' })
  status: LinkStatus;

  @Column()
  collectionId: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}

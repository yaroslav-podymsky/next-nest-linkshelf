import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Link } from '../links/link.entity';

@Entity('tags')
@Unique(['name', 'userId'])
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @ManyToMany(() => Link, (link) => link.tags)
  links: Link[];
}

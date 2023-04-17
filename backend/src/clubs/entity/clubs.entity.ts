import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Clubs {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  fee: number;
  @Column()
  pastActiveMembers: number;
  @Column()
  contactName: string;
  @Column()
  contact: string;

  @ManyToMany(() => User, (user) => user.clubs)
  @JoinTable()
  users: User[];
}

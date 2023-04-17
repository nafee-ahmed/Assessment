import { Clubs } from 'src/clubs/entity/clubs.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  password: string;

  @ManyToMany(() => Clubs, (club) => club.users)
  clubs: Clubs[];
}

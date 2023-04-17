import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Clubs } from './entity/clubs.entity';

// has all the logic for crud of clubs
// importing to repositories user and clubs
@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Clubs) private clubRepository: Repository<Clubs>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async createCubs() {
    const c1 = new Clubs();
    c1.title = 'Club Sephora';
    c1.about =
      'mollitia ea omnis dolorem architecto. Officia oditcupiditate porro voluptatibus explicabo incidunt enim, eaque sapientelaudantium minus temporibus?';
    c1.fee = 10;
    c1.pastActiveMembers = 200;
    c1.contactName = 'John Doe';
    c1.contact = '+601139718165';
    await this.clubRepository.save(c1);

    const c2 = new Clubs();
    c2.title = 'Club Sephora 1';
    c2.about =
      'mollitia ea omnis dolorem architecto. Officia oditcupiditate porro voluptatibus explicabo incidunt enim, eaque sapientelaudantium minus temporibus?';
    c2.fee = 10;
    c2.pastActiveMembers = 200;
    c2.contactName = 'John Doe';
    c2.contact = '+601139718165';
    await this.clubRepository.save(c2);

    const c3 = new Clubs();
    c3.title = 'Club Sephora 2';
    c3.about =
      'mollitia ea omnis dolorem architecto. Officia oditcupiditate porro voluptatibus explicabo incidunt enim, eaque sapientelaudantium minus temporibus?';
    c3.fee = 10;
    c3.pastActiveMembers = 200;
    c3.contactName = 'John Doe';
    c3.contact = '+601139718165';
    await this.clubRepository.save(c3);
    return { message: 'All clubs created' };
  }

  async getClubById(clubId: number) {
    return this.clubRepository.findOne({ where: { id: clubId } });
  }

  async applyClub(clubId: number, userId: number) {
    console.log(clubId, userId);
    const user = await this.userService.getUser(userId);
    const club = await this.getClubById(clubId);
    user.clubs.push(club);
    await this.userRepository.save(user);
    return { message: 'Applied' };
  }

  async getAppliedClubs(userId: number) {
    const user = await this.userService.getUser(userId);
    const clubs = user.clubs.map((club) => {
      const { id, title, about, fee, pastActiveMembers, contactName, contact } =
        club;
      return {
        id,
        title,
        about,
        fee,
        pastActiveMembers,
        contactName,
        contact,
        users: [],
      };
    });
    return {"message": clubs} ;
  }

  async getAll(userId: number) {
    const clubs = await this.clubRepository
      .createQueryBuilder('clubs')
      .leftJoinAndSelect('clubs.users', 'user', 'user.id = :userId', { userId })
      .where('user.id IS NULL')
      .getMany();
    const clubList = clubs.map((club) => {
      const {
        id,
        title,
        about,
        fee,
        pastActiveMembers,
        contactName,
        contact,
        users,
      } = club;
      return {
        id,
        title,
        about,
        fee,
        pastActiveMembers,
        contactName,
        contact,
        users,
      };
    });
    return { message: clubList };
  }

  async getClubByIdWithUsers(clubId: number) {
    return this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['users'],
    });
  }

  async getDetails(clubId: number, userId: number) {
    const club = await this.getClubByIdWithUsers(clubId);
    const { id, title, about, fee, pastActiveMembers, contactName, contact } =
      club;
    const clubDetails = {
      id,
      title,
      about,
      fee,
      pastActiveMembers,
      contactName,
      contact,
      hasApplied: club.users.some((user) => user.id === userId),
    };
    return { message: clubDetails };
  }
}

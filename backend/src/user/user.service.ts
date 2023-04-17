import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

// service has all the logic for users like crud
// Injectable means it can be imported in other modules.
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // createUserDto validates the fields during insert of user.
    const savedUser = await this.userRepository.save(createUserDto);
    const loggedIn = await this.authService.login(savedUser);
    return loggedIn;
  }

  findByEmail(email: string) {
    const options: FindOneOptions<User> = {
      where: {
        email: email,
      },
    };
    return this.userRepository.findOne(options);
  }

  getUser(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['clubs'],
    });
  }

  
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
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

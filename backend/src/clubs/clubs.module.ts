import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { Clubs } from './entity/clubs.entity';

@Module({
  controllers: [ClubsController],
  providers: [ClubsService],
  imports: [TypeOrmModule.forFeature([Clubs, User]), UserModule],
})
export class ClubsModule {}

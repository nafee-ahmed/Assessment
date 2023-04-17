import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClubsModule } from './clubs/clubs.module';
import { Clubs } from './clubs/entity/clubs.entity';

// this has the db configurations
// If you run with docker compose, use "db" as host,
// but if you want to run without docker, use "127.0.0.1" as host
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db', // '127.0.0.1' // "db"
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'studentsclub',
      entities: [User, Clubs],
      synchronize: true,
    }),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClubsModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}

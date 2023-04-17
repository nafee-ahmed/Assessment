import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.service';

// userService is a provider so able to use the methods of it.
// if email exists, return error to frontend
// This class is also set as provider in the user module, so it can
// be used elsewhere
// create-user.dto finally uses it
@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class CustomEmailvalidation implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    return this.userService.findByEmail(value)
      .then((user) => {
        if (user) {
          throw new UnprocessableEntityException('Email already exists');
        } else {
          return true;
        }
      });
  }
}

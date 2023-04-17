import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomEmailvalidation } from '../email-validation';

// here it is being validated for sign up, when creating the user.
export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'The email is required' })
  //   unique email validation, on file email-validation.ts
  @Validate(CustomEmailvalidation)
  email: string;
  @IsNotEmpty({ message: 'The name is required' })
  name: string;
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}

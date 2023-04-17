import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomEmailvalidation } from '../email-validation';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'The email is required' })
  //   unique email validation
  @Validate(CustomEmailvalidation)
  email: string;
  @IsNotEmpty({ message: 'The name is required' })
  name: string;
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}

import {
  ValidateEmail,
  ValidatePassword,
  ValidateName,
} from '../../common/decorators/validation.decorators';

export class CreateUserDto {
  @ValidateName(3)
  name: string;

  @ValidateEmail()
  email: string;

  @ValidatePassword()
  password: string;
}

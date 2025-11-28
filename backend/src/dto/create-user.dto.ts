import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  socialSecurityNumber: string;

  @IsString()
  creditCardNumber: string;
}

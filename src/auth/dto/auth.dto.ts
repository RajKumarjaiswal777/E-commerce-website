import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class AuthDto{
  

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  
}

import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private userService: UsersService,
  ) {}

  async signUp(dto: AuthDto) {
    const user = await this.userService.createUser(dto);
    return user;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    console.log('Login attempt with:', dto);

    const userInfo = await this.prisma.user.findUnique({ where: { email } });
    console.log('User info:', userInfo);

    if (!userInfo) {
      throw new ForbiddenException('User does not exist');
    }

    const passwordMatch = await this.checkPassword(password, userInfo.password);
    if (!passwordMatch) {
      throw new ForbiddenException('Invalid password');
    }
     

    const accessToken = await this.signToken(userInfo.id.toString(), userInfo.email);
    console.log('Access token:', accessToken);

    return { accessToken };
  }

  async checkPassword(plainPassword: string, encryptedPassword: string): Promise<boolean> {
    try {
      console.log(plainPassword, encryptedPassword);
      return await argon.verify(encryptedPassword, plainPassword);
    } catch (error) {
      console.log('Error while matching password');
      throw error;
    }
  }

  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });
    return { access_token: token };
  }
}

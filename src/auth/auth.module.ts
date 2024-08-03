import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[UserModule],
  providers: [AuthService,PrismaService,JwtService,UsersService,ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}

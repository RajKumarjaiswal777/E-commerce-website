import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ ConfigService,PrismaService,UsersService],
  controllers: [UserController],
  exports:[UsersService]
})
export class UserModule {}

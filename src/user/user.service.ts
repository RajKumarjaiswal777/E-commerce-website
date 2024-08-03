import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: AuthDto) {
    // Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const hashedPassword = await argon.hash(data.password);

    // Prepare the data for user creation
    const userData: any = {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      
    };

  
    // Create the user
    const user = await this.prisma.user.create({ data: userData });

    // Optionally remove sensitive information from response
    delete user.password;

    return user;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not available for this Id ' + id);
    }

    // Optionally remove sensitive information from response
    delete user.password;

    return user;
  }
}

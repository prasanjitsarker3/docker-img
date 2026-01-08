import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }


  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }
    return await this.prismaService.user.create({
      data: createUserDto
    })

  }

  async findAll() {
    return await this.prismaService.user.findMany()
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: {
        id: id
      }
    })
  }
}

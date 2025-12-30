import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma';
import { LoggerServices } from 'src/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerServices,
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const result = await this.prismaService.user.create({
        data: createAuthDto,
      });
      return result;
    } catch (error) {
      this.logger.error(
        'User creation failed',
        error?.stack,
        AuthService.name,
      );
    }
  }

  async findAll() {

    const result = await this.prismaService.user.findMany()
    return result

  }


  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

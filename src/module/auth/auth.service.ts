import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from 'src/common/cache/cache.services';

@Injectable()
export class AuthService {
  private readonly CACHE_KEY = 'users';
  constructor(@Inject(CACHE_MANAGER) private cacheService: CacheService) { }

  async create(createAuthDto: CreateAuthDto) {

    const users: any[] = (await this.cacheService.get(this.CACHE_KEY)) || [];
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...createAuthDto };

    if (users.some(u => u.email === newUser.email)) {
      throw new Error('User with this email already exists.');
    }

    users.push(newUser);

    await this.cacheService.set(this.CACHE_KEY, users, 300); 
    return newUser;
  }

  async findAll() {
    let users = await this.cacheService.get(this.CACHE_KEY);
    if (!users) {
      users = [];
      await this.cacheService.set(this.CACHE_KEY, users, 300);
    }
    return users;
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

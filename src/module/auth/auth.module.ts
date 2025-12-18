import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheService } from 'src/common/cache/cache.services';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CacheService],
})
export class AuthModule { }

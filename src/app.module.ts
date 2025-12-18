import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { GlobalCacheModule } from './common/cache/cache.module';

@Module({
  imports: [GlobalCacheModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


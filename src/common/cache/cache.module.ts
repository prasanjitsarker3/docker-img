import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.services';

@Global()
@Module({
    imports: [
        CacheModule.register({
            ttl: 300,
            isGlobal: true,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class GlobalCacheModule { }

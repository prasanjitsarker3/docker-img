import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

    async set<T = any>(key: string, value: T, ttl = 300): Promise<void> {
        await (this.cacheManager as any).set(key, value, { ttl });
    }

    async get<T = any>(key: string): Promise<T | undefined> {
        return await this.cacheManager.get<T>(key);
    }

    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    async reset(): Promise<void> {
        if (typeof (this.cacheManager as any).reset === 'function') {
            await (this.cacheManager as any).reset();
        } else if (typeof (this.cacheManager as any).store?.reset === 'function') {
            await (this.cacheManager as any).store.reset();
        } else if (typeof (this.cacheManager as any).store?.flushAll === 'function') {
            await (this.cacheManager as any).store.flushAll();
        } else {
            throw new Error('Cache store does not support reset.');
        }
    }
}

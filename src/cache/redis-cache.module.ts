import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheService } from './servicies/redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { CoreRedisCacheService } from './servicies/core-redis-cache.service';

@Global()
@Module({
    controllers: [RedisCacheController],
    imports: [
        CacheModule.registerAsync<RedisClientOptions>({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: await redisStore,
                socket: {
                    host: configService.get('database.redis.host'),
                    port: configService.get('database.redis.port')
                }
            })
        })
    ],
    providers: [CoreRedisCacheService, RedisCacheService],
    exports: [RedisCacheService]
})
export class RedisCacheModule {}

import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RedisCacheService } from './servicies/redis-cache.service';
import { RedisSetDto } from './dto/redis-set-dto';
import { CoreRedisCacheService } from './servicies/core-redis-cache.service';

@Controller('api/v1/redis')
export class RedisCacheController {
    constructor(
        private readonly coreRedisCacheService: CoreRedisCacheService,
        private readonly redisCacheService: RedisCacheService
    ) {}

    @Get(':key')
    async getRedisData(@Param('key') key: string) {
        return await this.redisCacheService.getRedisData(key);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async setRedisData(@Body() redisSetDto: RedisSetDto) {
        return await this.redisCacheService.setRedisData(redisSetDto);
    }
}

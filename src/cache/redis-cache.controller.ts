import { Controller, Get, Param } from '@nestjs/common';
import { RedisCacheService } from './servicies/redis-cache.service';

@Controller('api/v1/redis')
export class RedisCacheController {
    constructor(private readonly redisCacheService: RedisCacheService) {}

    @Get(':key')
    async getRedisData(@Param('key') key: string) {
        return await this.redisCacheService.get(key);
    }
}

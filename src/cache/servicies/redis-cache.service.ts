import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CoreRedisCacheService } from './core-redis-cache.service';
import { RedisSetDto } from '../dto/redis-set-dto';

@Injectable()
export class RedisCacheService {
    constructor(private readonly coreRedisCacheService: CoreRedisCacheService) {}

    async getRedisData(key: string): Promise<object> {
        return await this.coreRedisCacheService.get(key);
    }

    async setRedisData(redisSetDto: RedisSetDto): Promise<object> {
        try {
            await this.coreRedisCacheService.set(redisSetDto.key, redisSetDto.value, redisSetDto.expire);
            // TODO : 임시로 반환 형식 설정함 - 공통으로 사용 할 모듈 생성 후 적용하기
            return {
                message: 'Success'
            };
        } catch (error: any) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteRedisData(key: string): Promise<object> {
        if (!(await this.getRedisData(key))) {
            throw new BadRequestException('this is a key for which no data exists');
        }

        try {
            await this.coreRedisCacheService.del(key);
            // TODO : 임시로 반환 형식 설정함 - 공통으로 사용 할 모듈 생성 후 적용하기
            return {
                message: 'Success'
            };
        } catch (error: any) {
            throw new InternalServerErrorException(error);
        }
    }
}

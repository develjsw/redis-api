import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configDevelopment from './config/config.development';
import configProduction from './config/config.production';
import { RedisCacheModule } from './cache/redis-cache.module';

let config;
if (process.env.NODE_ENV === 'production') {
    config = configProduction;
} else {
    config = configDevelopment;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [config]
        }),
        RedisCacheModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

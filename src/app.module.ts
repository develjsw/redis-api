import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import localConfig from './config/local.config';
import developmentConfig from './config/development.config';
import productionConfig from './config/production.config';
import { RedisCacheModule } from './cache/redis-cache.module';

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = productionConfig;
        break;
    case 'development':
        config = developmentConfig;
        break;
    default:
        config = localConfig;
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

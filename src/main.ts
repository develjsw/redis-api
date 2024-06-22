import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from './logger/winston.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true, logger: winstonLogger });
    const configService = app.get(ConfigService);
    await app.listen(configService.get('port'));
}
bootstrap();

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const logger = new Logger()
  const enviroments = process.env;
  logger.log('ENVIROMENTS')
  logger.warn('DB_PORT: '+enviroments.DB_PORT)
  logger.warn('DB_NAME: '+enviroments.DB_NAME)
  logger.warn('DB_HOST: '+enviroments.DB_HOST)

  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Backend Restaurante API')
    .setDescription('TesloShop endpoints')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().then(() => 'Application Started');

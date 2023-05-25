// ========== Main
// import all modules
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const port: number = app.get(ConfigService).get<number>('PORT');
  const appUrl: string = app.get(ConfigService).get<string>('APP_URL');
  const nodeEnv: string = app.get(ConfigService).get<string>('NODE_ENV');
  const whitelist: string[] = app
    .get(ConfigService)
    .get<string>('WHITELIST')
    .split(',');

  // Setup Compression
  await app.register(compression);

  // Setup Helmet
  await app.register(helmet);

  // Setup Csrf
  await app.register(fastifyCsrf);

  // Setup Morgan
  if (nodeEnv === 'development') app.use(require('morgan')('dev'));

  // Setup Cors
  app.enableCors({
    origin: whitelist,
  });

  // Setup Global Prefix
  app.setGlobalPrefix('/api');

  // Setup Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Personal Website')
    .setDescription('This is an API Documentation for Personal Website')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  // Setup Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`The RESTful API is being run at ${appUrl}`);
}

bootstrap();

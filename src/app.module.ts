// ========== App Module
// import all modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Setup Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Setup Static Files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/public',
    }),

    // Setup Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('RATE_LIMITING_TTL'),
        limit: configService.get<number>('RATE_LIMITING_LIMIT'),
      }),
      inject: [ConfigService],
    }),

    // Setup Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>(
          'DB_USER',
        )}:${configService.get<string>('DB_PASS')}@${configService.get<string>(
          'DB_HOST',
        )}:${configService.get<string>('DB_PORT')}`,
        dbName: configService.get<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvVars } from './type.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env: Record<string, unknown>): EnvVars => ({
        DB_HOST: typeof env.DB_HOST === 'string' ? env.DB_HOST : 'localhost',
        DB_PORT: typeof env.DB_PORT === 'string' ? Number(env.DB_PORT) : 5432,
        DB_USER: typeof env.DB_USER === 'string' ? env.DB_USER : 'postgres',
        DB_PASS: typeof env.DB_PASS === 'string' ? env.DB_PASS : 'password',
        DB_NAME: typeof env.DB_NAME === 'string' ? env.DB_NAME : 'postgres',
        DB_SSL: env.DB_SSL === 'true',
        PORT: typeof env.PORT === 'string' ? Number(env.PORT) : 3000,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvVars, true>) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASS'),
        database: configService.getOrThrow('DB_NAME'),
        ssl: configService.getOrThrow('DB_SSL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

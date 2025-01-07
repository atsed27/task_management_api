import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export const DRIZZLE = Symbol('drizzle-connection');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const client = postgres(configService.get<string>('DATABASE_URL'), {
          ssl: { rejectUnauthorized: false }, // Enable SSL
        });
        const db = drizzle(client);
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './drizzel/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { fileUploadModule } from './fileUploads/fileUpload.module';
import { userModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    fileUploadModule,
    userModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

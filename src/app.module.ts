import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './drizzel/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { fileUploadModule } from './fileUploads/fileUpload.module';
import { userModule } from './users/users.module';
import { taskModual } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    fileUploadModule,
    userModule,
    taskModual,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './fileUpload.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryProvider],
})
export class fileUploadModule {}
